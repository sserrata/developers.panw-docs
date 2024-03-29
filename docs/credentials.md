---
id: credentials
title: Credentials
sidebar_label: Credentials
---

## Overview

The Application Framework implements OAuth 2.0 for delegating access to
the Logging, Event and Directory Sync services.

The `pancloud` SDK comes packaged with OAuth 2.0 support to ease the
process of:

   - Generating the authorization URL
   - Exchanging and authorization code for tokens (authorization code
     grant)
   - Refreshing tokens
   - Revoking tokens
   - Token caching
   - Using a custom credentials store (storage adapters)

## Obtaining and Using Tokens

Starting in version 1.5.0, `pancloud` now supports two types of
credentials:

   - OAuth 2.0 credentials (<span class="title-ref">client\_id</span>,
     <span class="title-ref">client\_secret</span> and
     <span class="title-ref">refresh\_token</span>)
   - Developer Tokens (obtained from [API
     Explorer](https://app.apiexplorer.rocks))

<div class="note">

<div class="admonition-title">

Note

</div>

The difference between the two is that the first requires developers to
write an application capable of performing the OAuth 2.0 authorization
code grant flow whereas the second enables developers to quickly get
started, by leveraging API Explorer's built-in
<span class="title-ref">access\_token</span> redemption service.

</div>

## OAuth 2.0 Credentials

If you are looking to build your own web app, work with your Developer
Relations representative to register your application to receive the
minimum credentials needed to perform the OAuth 2.0 authorization code
grant flow: <span class="title-ref">client\_id</span> and
<span class="title-ref">client\_secret</span>.

A successful authorization will grant a
<span class="title-ref">refresh\_token</span> that can be combined with
the <span class="title-ref">client\_id</span> and
<span class="title-ref">client\_secret</span> to perform API requests
using `pancloud`.

The following illustrates how to generate a `credentials.json` file
using the `summit.py` command-line utility or the
`credentials_generate.py` script included in the `pancloud` GitHub repo
[examples](https://github.com/PaloAltoNetworks/pancloud/tree/master/examples)
folder.

summit.py:

``` console
$ summit.py -C --R0 cred-init.json --write
```

cred-init.json example:

``` json
{
    "client_id": "<client_id>",
    "client_secret": "<client_secret>",
    "refresh_token": "<refresh_token>"
}
```

credentials\_generate.py:

``` console
$ ./credentials_generate.py
```

<div class="note">

<div class="admonition-title">

Note

</div>

The script will prompt for `client_id`, `client_secret`, `refresh_token`
and a `profile` name.

</div>

Once your `credentials.json` file is generated, you should be ready to
run the examples packaged with the `pancloud` repo or use the `pancloud`
SDK in your own project.

## Developer Tokens

Developer Tokens is a new concept introduced in `pancloud` v1.5.0 that
enables developers to quickly get started by offloading the OAuth 2.0
authorization code grant flow to API Explorer, in exchange for a
<span class="title-ref">developer\_token</span>.

What exactly is a <span class="title-ref">developer\_token</span>
anyway? In a nutshell, a <span class="title-ref">developer\_token</span>
is used to authenticate with API Explorer's built-in
<span class="title-ref">access\_token</span> redemption service. It's
intended to eliminate the need to acquire and store a
<span class="title-ref">client\_id</span>,
<span class="title-ref">client\_secret</span> and
<span class="title-ref">refresh\_token</span> in your own credentials
store, which could be risky without implementing the proper security
best practices.

The following sections illustrate how to activate and authorize API
Explorer so it can be used to generate a
<span class="title-ref">developer\_token</span>.

## Activating API Explorer

1.  Login to the [Cortex Hub]():
     
    ![image](assets/cortexhub.png)
 
2.  Ensure both Logging and Directory Sync Service are activated:
     
    ![image](assets/requirements.jpeg)
 
3.  Activate API Explorer:
     
    ![image](assets/activate.png)
 
4.  Complete activation:
     
    ![image](assets/activation.png)
 
5.  Click tile to login to your API Explorer instance:
     
    ![image](assets/redirectlogin.png)
 
6.  Click the <span class="title-ref">Authorize</span> button
     corresponding to your instance (if not already authorized):
     
    ![image](assets/authorize.png)
 
7.  Complete the authorization form (if not already authorized):
     
    ![image](assets/authorization.png)
 
8.  Give consent to API Explorer for accessing your data:
     
    ![image](assets/consentform.png)

Now that API Explorer has been authorized, let's move on to generate a
<span class="title-ref">developer\_token</span>\!

## Generating a Developer Token

1.  Click the <span class="title-ref">key</span> icon corresponding
     with your authorized instance:
     
    ![image](assets/generate.png)
 
2.  Review the <span class="title-ref">NOTICE</span> and select an
     appropriate expiration for your \`developer\_token\`:
     
    ![image](assets/generation.png)
 
3.  Click the <span class="title-ref">Generate</span> button to
    generate your <span class="title-ref">developer\_token</span>.
    Note that it will only be displayed once, so be sure to copy and
    store it securely if appropriate.

<div class="note">

<div class="admonition-title">

Note

</div>

At this point, you will be given an opportunity to record your Developer
Token for safe keeping. Whatever you choose to do, keep it secret and
keep it safe, as it allows anyone in possession of it to potentially
access your data.

</div>

## Using a Developer Token

There are two primary ways to use a
<span class="title-ref">developer\_token</span> with \`pancloud\`:

  - Export a <span class="title-ref">PAN\_DEVELOPER\_TOKEN</span>
    environment variable
    
     
     
```console
export PAN_DEVELOPER_TOKEN=<your token>
```

  - Pass a <span class="title-ref">developer\_token</span> kwarg into
    your <span class="title-ref">Credentials</span> class constructor
    (as illustrated below):
    
     
     
```python
from pancloud import Credentials

c = Credentials(developer_token=<your token>)
```

From this point forward, your <span class="title-ref">Credentials</span>
object should be capable of obtaining and refreshing an
<span class="title-ref">access\_token</span> using API Explorer's
built-in token redemption service.

<div class="note">

<div class="admonition-title">

Note

</div>

You may notice that your <span class="title-ref">credentials.json</span>
file only stores and updates the
<span class="title-ref">access\_token</span> value when using a
<span class="title-ref">developer\_token</span>. This is by design, as
API Explorer, acting as the token redemption service, is responsible for
storing the additional credentials needed to perform an
<span class="title-ref">access\_token</span> refresh.

</div>

## Credential Resolver

The `pancloud` `~pancloud.credentials.Credentials` class implements a
built-in resolver that looks for credentials in different places,
following a particular lookup order:

1.  Credentials passed as `~pancloud.credentials.Credentials`
    constructor key-word arguments:

<!-- end list -->

``` python
c = Credentials(
    client_id=<client_id>,
    client_secret=<client_secret>,
    refresh_token=<refresh_token>
)
```

2.  Credentials stored as environment variables:
    
       - `PAN_REFRESH_TOKEN`
       - `PAN_CLIENT_ID`
       - `PAN_CLIENT_SECRET`

3.  Credentials stored in a credentials file
    (\~/.config/pancloud/credentials.json) or custom store:

<!-- end list -->

``` python
{
    "profiles": {
        "1": {
            "access_token": <access_token>,
            "client_id": <client_id>,
            "client_secret": <client_secret>,
            "profile": <profile>,
            "refresh_token": <refresh_token>
        }
    }
}
```

The resolution performs a top-down, first match evaluation and stops
when any of the four credentials are detected. Attempting to
`~pancloud.credentials.Credentials.refresh` with an incomplete set of
credentials will raise a `~pancloud.exceptions.PartialCredentialsError`.

<div class="note">

<div class="admonition-title">

Note

</div>

The `Credentials` class supports `profiles` which can be used to
conveniently switch between developer environments. You may also choose
to use a different `~pancloud.adapters.adapter.StorageAdapter` than the
default (`TinyDB`) which would result in credentials being stored
outside of `credentials.json`.

</div>

# Auto-refresh

By default, `Credentials` supports `auto_refresh` when valid credentials
are present (and `raise_for_status` is not passed).

`pancloud` will auto-refresh and apply the `access_token` to the
`"Authorization: Bearer"` header under the following conditions:

  - `auto_refresh` is set to `True`.
  - `access_token` is `None`.
  - `exp` field in <span class="title-ref">access\_token</span> is
    expired.

## Access Token Caching

By default, `Credentials` supports caching `access tokens`, by writing
the most recent `access_token` to the credentials store. The desired
effect of caching `access tokens` is to limit the number of times a
token refresh is required.

For example, if your application implements concurrency, there might be
situations where a burst of activity leads to multiple clients
requesting a token refresh. By caching the `access_token`, `pancloud`
can instruct these clients to check the credentials store first, before
attempting to communicate with the token endpoint to perform a refresh.

<div class="note">

<div class="admonition-title">

Note

</div>

In addition to improving client performance, this method of caching
`access tokens` also helps prevent an inadvertent denial-of-service of
the token endpoint.

</div>

## Rolling Refresh Tokens and Caching

If the authorization server supports rolling refresh tokens,
`Credentials` will automatically record and cache a new `refresh_token`,
if one is returned by the token refresh endpoint.

## Custom Storage Adapters

The default storage adapter for `Credentials` is `TinyDB`, which stores
credentials in `~/.config/pancloud/credentials.json`. The good news is
that `TinyDB` is just the first of many potential credential stores that
`pancloud` will support.

The road map for `pancloud` includes adding additional storage adapters
to support storing credentials in `Redis`, `Memcached`, `MongoDB`, `AWS
Key Management Service` and `sqlite3`, to name a few. Ultimately, the
goal is to support any possible store\!

The following gists illustrate a few examples.

## Memcached Storage Adapter

<embed>
    <script src="https://gist.github.com/sserrata/a544d12bfa7e4d5e23f61a09adf0051e.js"></script>
</embed>

## Redis Storage Adapter

<embed>
    <script src="https://gist.github.com/sserrata/3ecbc2a2873025efcfcc79e280e28577.js"></script>
</embed>