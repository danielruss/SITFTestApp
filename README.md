# SITFTestApp
Example application that uses *SOCcer in the Field*

SOCcer in the Field (SITF) is typically called during the questionnaire process. For example, after asking the study participant about their job title and job task, SITF is a API to a server-based version of SOCcer, (currently SOCcer 2.0) that returns a JSON object

There is only one method

### HTTP request

`GET <API_Root>/soccer/code?title=<JobTitle>&task=<JobTask>&n=<n_codes>`


where `API_ROOT` is the URL of your SITF instance, `JobTitle` is a single job title, `JobTask` is a single job task, and `n_codes` is the number of US SOC 2010 codes returned by SITF.

I have included a web-app that simulates the what the interaction between the questionnaire software and the SITF API.  You need to have your instance of SITF running.  Unfortunately cloud providers charge per instance, so I cannot just give you my API_ROOT.  However, I can help you get up and running.