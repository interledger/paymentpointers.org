---
layout: page
title: Namespace for RDF
permalink: /ns
nav_order: 7
---
## PaymentPointer

Use `http://paymentpointers.org/ns#PaymentPointer` as the predicate when linking a WebId to a Payment Pointer. Make sure this triple lives in the profile document to which the WebID dereferences. Example:

```ttl
@prefix pp: <http://paymentpointers.org/ns#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
<#me> a <foaf:Person> ;
  pp:PaymentPointer "user@example.com".
```
