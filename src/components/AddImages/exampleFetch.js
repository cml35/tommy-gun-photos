fetch("https://webapp-api-oceania-staging.con.qa/v1/batchUpdate", {
    "headers": {
      "accept": "application/json",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      "authorization": "AWS eyJraWQiOiIrZnNFSTdEUnhwMmduODR6ZTZySFgyd2VhbzZubzV2VEpLWnlPXC9sRWg3UT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwOGRlNWYxYi1iY2JiLTQ0YmItYTRlYS1kNDdiYTk2ZmY0ZTYiLCJkZXZpY2Vfa2V5IjoidXMtd2VzdC0yXzdjZTJmNTkxLWIxYTgtNDdmYi1iYjQ5LWNhNjhmYjliZmVmMiIsImNvZ25pdG86Z3JvdXBzIjpbIk1pZ3JhdGlvbk1hbmFnZXIiLCJjb25xYSJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl81QzZneFdNU2ciLCJjbGllbnRfaWQiOiI3cGpybnNlMG81ODIxNjk5aWI3ZG1zam9zaSIsImV2ZW50X2lkIjoiNTY2NjU2M2MtZTNiNS00MTEwLTk5MWEtZTUwYjVhM2RkZGQwIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY1NTc2NTMwMiwiZXhwIjoxNjU3MTY1MjYwLCJpYXQiOjE2NTcxNjE2NjAsImp0aSI6IjFhNDc0ZWJmLTBhZDAtNGE2Ni1hZGU5LTY5NWIxZTkwZTg2OSIsInVzZXJuYW1lIjoiZGQ1NWM4ZGItM2RhOC00NjI4LWFiMzUtZGZiYTFiMDdiZWIzIn0.c-V3kv_77m0yt4YTzBDzq22SBtrV7H5FNPYQW6irIp3TeSWr2DT9eU06vjz0anJzpTadS4JyYzGDIVALRWbkxziL4uVwSkDP_Frq7JGVfTZ2A-wEmVhYf499pOjxbdbM0js_R0ScoeRDXdJvYzgfa50xRxOoWFK9uq0EC0Vd8VyH51jc0-k1dY00sQ6pwBqxAamcXwiyuZ2KIGMAGsnLITHuseBwNA1DTE_P2Y5oqKL-rabqdp40ghD1uXsXx8ZeKLcXSxVqoYjgrOMd0xCkJwMwvy6aly_UpngjWqDQmE0U77fpkjAQNtrD9NFcIPRTzmQ7fqZ9_i7nteK5nmMxCg",
      "content-type": "application/json"
    },
    "referrer": "https://s3.con.qa/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "{\"source\":\"addFiles\",\"projectId\":\"35ae371a-2fd7-4e00-81d5-1596d03252b8\",\"accountId\":\"2dfe64e4-36bd-49b5-9be2-a56fbbf02720\",\"updates\":[{\"entry\":{\"meta\":{\"type\":\"post\",\"name\":\"logo.svg\"},\"data\":[{\"hash\":\"9d1d1cf1-ef5a-4726-a5ef-6f044a75666e\",\"ct\":\"image/svg+xml\"}]},\"path\":[\"qa_24190571-8421-4081-9ce4-30671e24b43e\",\"15a4388b-713b-4341-b57c-9d733b170cd0\",\"b9eec3c4-feb4-4d82-a993-56f9a091f422\",\"96da2793-6078-51a8-af36-6ec3f60e8f2e\",\"fe193d8b-bcbe-5500-bcbd-93ff1b977634\"]}]}",
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
  }); //push to an existing checkpoint