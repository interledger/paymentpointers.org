---
title: Syntax and Resolution
---

:::note
This specification uses the Augmented Backus-Naur Form (ABNF) notation of <a href="https://tools.ietf.org/html/rfc2234" target="_blank">RFC2234</a> and imports the `host` and `path-abempty` rules from <a href="https://tools.ietf.org/html/rfc3986#section-3.3" target="_blank">RFC3986</a>.
:::

The syntax of a payment pointer is:

```
"$" host path-abempty
```

For example: `$example.com/bob`

## ASCII

The character set of a payment pointer is limited to a subset of valid ASCII characters. Payment pointers begin with a dollar sign (`$`) to distinguish them from other types of identifiers and to indicate their association with payments. Implementations that attempt to interpret a payment pointer that contains non-ASCII characters should be aware of the security risks.

## Resolution

Payment pointers **MUST** resolve to an HTTPS URL that conforms to the HTTPS URI scheme as defined in <a href="https://datatracker.ietf.org/doc/html/rfc7230#section-2.7.2" target="_blank">RFC7230</a>.

Given a payment pointer of the form `"$" host path-abempty`, the endpoint URL that it resolves to is: `"https://" host path-abempty`.

```http title="Examples"
$example.com/bob → https://example.com/bob
$example.com/invoices/12345 → https://example.com/invoices/12345
```

If `path-abempty` is empty or equal to `/` (forward slash), then it's assigned a value of `/.well-known/pay`. This is a restricted profile of the data allowed in a full HTTPS URL, as defined in <a href="https://datatracker.ietf.org/doc/html/rfc3986#section-3.3" target="_blank">RFC3986 Section 3.3</a>.

```http title="Examples"
$example.com → https://example.com/.well-known/pay
$bob.example.com  → https://bob.example.com/.well-known/pay
```

There are a number of components that the <a href="https://datatracker.ietf.org/doc/html/rfc3986#section-3" target="_blank">full HTTPS syntax</a> supports, but which the payment pointer syntax does not. The payment pointer syntax only supports the `host` subcomponent.

Payment pointers that don't meet the limited syntax of this profile must be considered invalid and shouldn't be used to resolve URLs.

## Redirects

Clients **MUST** support HTTP redirects as a result of `3XX` responses per <a href="https://tools.ietf.org/html/rfc7231#section-6.4" target="_blank">RFC 7231</a>. The redirects **MUST** always be to a secure (HTTPS) URL.

Servers **SHOULD** be cautious with the use of permanent (`301`/`308`) redirect response codes as clients may stop querying the original payment pointer and always query the new URL for future payments.