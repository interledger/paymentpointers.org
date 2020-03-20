---
layout: page
title: Syntax and Resolution
permalink: /syntax-resolution/
nav_order: 4
---
## Syntax

This specification uses the Augmented Backus-Naur Form (ABNF) notation of [RFC2234](https://tools.ietf.org/html/rfc2234) and imports the following rules from [RFC3986](https://tools.ietf.org/html/rfc3986#section-3.3): `host` and `path-abempty`.

The syntax of a payment pointer is:

```
  "$" host path-abempty
```

Example: `$example.com/bob`

### ASCII

Note that the character set of a Payment Pointer, as with a valid URL, is limited to a subset of valid ASCII characters. 

Further work may be done to define mappings from other character sets that support international characters (similar to the rules for Internationalized Domain Names) however, such mappings are not defined in this specification. Implementations that attempt to interpret a Payment Pointer that contains non-ASCII characters should be aware of the security risks.

## Resolution

Given a payment pointer of the form `"$" host path-abempty` the endpoint URL that it resolves to is:

```
  "https://" host path-abempty
```

If _path-abempty_ is empty or equal to `/` then it is assigned the value `/.well-known/pay`.

Note that this is a restricted profile of the data allowed in a full https URL as defined in [RFC3986](https://tools.ietf.org/html/rfc3986#section-3.3). 

The URL syntax supports an _authority_, however the Payment Pointer syntax only supports a _host_ which excludes the _userinfo_ and _port_. The Payment Pointer syntax also excludes the _query_ and _fragment_ parts that are allowed in the URL syntax.

Payment Pointers that do not meet the limited syntax of this profile MUST be considered invalid and should not be used to resolve a URL.

### Examples:

The following payment pointers resolve to the specified endpoint URLs:

```
$example.com                  ->  https://example.com/.well-known/pay
$example.com/invoices/12345   ->  https://example.com/invoices/12345
$bob.example.com              ->  https://bob.example.com/.well-known/pay
$example.com/bob              ->  https://example.com/bob
```

### Requirements

Payment Pointers MUST resolve to an https URL as defined in [RFC7230](https://tools.ietf.org/html/rfc7230#section-2.7.2). It MUST accept HTTP GET requests to initiate the payment.

Clients MUST support HTTP redirects as a result of `3XX` responses per [RFC 7231](https://tools.ietf.org/html/rfc7231#section-6.4).
