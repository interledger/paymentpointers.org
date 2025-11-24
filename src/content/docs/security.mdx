---
title: Security Considerations
---

Payment pointers have many of the same security risks as URLs so it follows that the security considerations are the same even though payment pointers do not in and of themselves pose a security threat.

However, as payment pointers are used to provide a compact set of instructions for initiation of a payment, care must be taken to properly interpret the data within a payment pointer, to prevent payments being made to the wrong recipient or leaking of sensitive data.

## Reliability and Consistency

There is no guarantee that once a Payment Pointer has been used resolve a payment initiation service endpoint, the same service will be hosted at that URI in the future.

## Semantic Attacks and Phishing

Because Payment Pointers only support a limited profile of the data in a URL, not all of the attacks described in RFC3986 apply to payment pointers.

However, it is possible for a malicious actor to construct a payment pointer that appears to point to a trusted receiver but in fact points to a malicious actor. As a result the pointer is constructed that is intended to mislead a human user by appearing to identify one (trusted) naming authority while actually identifying a different authority hidden behind the noise.

As detailed in [RFC7230], the "https" scheme (Section 2.7.2) is intended to prevent (or at least reveal) many of these potential attacks on establishing the authority behind a pointer, provided that the negotiated TLS connection is secured and the client properly verifies that the communicating server's identity matches the target URIs authority component (see [RFC2818]). Correctly implementing such verification can be difficult (see [The Most Dangerous Code in the World](#the-most-dangerous-code-in-the-world-validating-ssl-certificates-in-non-browser-software)).

Payment Initiation Services should take heed of this risk in their design and provide a mechanism for the parties to reliably verify the counter-party's identity.

Agents of a user that is sending to a counter-party using a Payment Pointer MUST provide a way for the party, after processing the Payment Pointer, to verify that the entity they are sending to (or at least the entity hosting the payment initiation service) is who they intended otherwise senders can easily be fooled into sending money to the wrong receiver. An example of such a mechanism is the use of extended validation certificates at the endpoint.

## References

### The Most Dangerous Code in the World: Validating SSL Certificates in Non-browser Software

Georgiev, M., Iyengar, S., Jana, S., Anubhai, R., Boneh, D., and V. Shmatikov,
"The Most Dangerous Code in the World: Validating SSL Certificates in Non-browser Software",
In Proceedings of the 2012 ACM Conference on Computer and Communications Security (CCS'12), pp. 38-49, October 2012,
<http://doi.acm.org/10.1145/2382196.2382204>.
