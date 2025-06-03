---
title: Security Considerations
---

Payment pointers have many of the same risks as URLs. As such, the security considerations are the same even though payment pointers don't in and of themselves pose a security threat.

Payment pointers provide a compact set of instructions for initiation of a payment. As such, take care to properly interpret the data within a payment pointer to prevent leaking sensitive data or making payments to the wrong recipient.

## Reliability and consistency

There's no guarantee that once a payment pointer is used to resolve a payment service endpoint that the same endpoint will be posted at that URI in the future.

The client should always issue a new `GET` request to a payment pointer and not rely on any potentially stored or cached information.

## Semantic attacks and phishing

Because payment pointers only support a limited profile of the data in a URL, not all attacks described in the <a href="https://datatracker.ietf.org/doc/html/rfc3986" target="_blank">URI: Generic Syntax</a> specification apply.

It's possible for a malicious actor to construct a payment pointer that appears to point to a trusted recipient but actually points to a malicious actor. As a result, the payment pointer is intended to mislead a human user by appearing to identify one trusted naming authority while identifying a different authority hidden behind the noise.

As detailed in the _HTTP/1.1: Message Syntax and Routing_ specification, the HTTPS scheme <a href="https://datatracker.ietf.org/doc/html/rfc7230#section-2.7.2" target="_blank">Section 2.7.2</a> is intended to prevent, or at least reveal, many of these potential attacks on establishing the authority behind a payment pointer, provided that the negotiated TLS connection is secured and the client properly verifies that the communicating server’s identity matches the target URIs authority component (see <a href="https://datatracker.ietf.org/doc/html/rfc2818" target="_blank">RFC2818</a>). Correctly implementing such verification can be difficult. See the paper for <a href="https://www.cs.utexas.edu/~shmat/shmat_ccs12.pdf" target="_blank">The Most Dangerous Code In the World</a>.

Payment initiation services should take heed of this risk in their design and provide a mechanism for the parties to reliably verify the counterparty’s identity.

Agents of a user sending a payment to a counterparty must provide a way for the user, after processing the counterparty's payment pointer, to verify that the counterparty they're sending to (or at least the entity hosting the payment initiation service) is who they intended. Otherwise, users can be fooled into sending money to the wrong recipient. 

An example of such a mechanism is the use of extended validation certificates at the endpoint.
