import localforage from 'https://cdn.jsdelivr.net/npm/localforage@1.10.0/+esm'

let cache = await localforage.createInstance({
    name: "sitftestapp",
    store: "cache"
})

let cached_apiroot = await cache.getItem("apiroot") ?? ""
let api_url = "";
console.log("... in index.js ...", cached_apiroot)

function updateDisplay() {
    let display = (cached_apiroot.length == 0) ? "none" : "initial"
    console.log(`in ud: api:   ${cached_apiroot} lenght:${cached_apiroot.length} ${display}`)
    document.querySelectorAll("body > div").forEach(e => {
        console.log(`${e.id} set to ${display}`)
        e.style.display = display
    })
    display = (cached_apiroot.length == 0) ? "initial" : "none"
    document.querySelectorAll("body > div[data-noroot]").forEach(e => {
        let jobTitle = document.getElementById("JobTitle").value
        let jobTask = document.getElementById("JobTask").value
        let n = parseInt(document.getElementById("nCodes").value) ?? 4

        if (jobTitle.length > 0 && jobTask.length > 0) {
            api_url = `${cached_apiroot}/soccer/code?title=${jobTitle}&task=${jobTask}&n=${n}`
        } else if (jobTitle.length > 0) {
            api_url = `${cached_apiroot}/soccer/code?title=${jobTitle}&n=${n}`
        } else if (jobTask.length > 0) {
            api_url = `${cached_apiroot}/soccer/code?title=${jobTask}&n=${n}`
        }

        if (api_url.length > 0) {
            document.getElementById("apiurl").innerText = api_url
        } else {
            document.getElementById("apiurl").innerText = `${cached_apiroot}/soccer/code?title=<JobTitle>&task=<JobTask>&n=<N>`
        }
        console.log(`${e.id} set to ${display}`)
        e.style.display = display
    })
}

updateDisplay()
document.getElementById("apirootButton").addEventListener("click", async () => {
    let apiroot = document.getElementById("apiroot").value
    await cache.setItem("apiroot", apiroot)
    cached_apiroot = await cache.getItem("apiroot") ?? ""
    updateDisplay()
})

document.getElementById("runButton").addEventListener("click", async () => {
    updateDisplay()
    console.log("click....", api_url)
    let json = await (await fetch(api_url)).json()
    let text = JSON.stringify(json, null, 2)
    document.getElementById('json_out').innerText = text
    console.log("text ===> ", text)
})

document.getElementById("clearAPIRootButton").addEventListener("click", async () => {
    cached_apiroot = ""
    api_url = "";
    await cache.setItem("apiroot", cached_apiroot)
    updateDisplay()
})

console.log("... finished index.js ...")
