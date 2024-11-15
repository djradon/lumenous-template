---
title: Radio
description: Field to pick one of multiple options
---

The field of type `radio` is used to store select one of multiple available
options. It display a list of `<input type="radio">` in the UI.

## Example

```ts
{
  name: "status",
  type: "radio",
  options: [
    "enabled",
    "disabled",
    "unknown",
  ],
}
```

## Available options

In addition to the common options (see
[fields documentation](../configuration/fields.md#common-field-options) for more
info), this field has the following options:

### options

A list of the available options to select. Each option can be a string or an
object with `label` and `value` properties. Example:

```ts
{
  name: "status",
  type: "select",
  options: [
    "enabled",
    "disabled",
    {
      label: "Not known",
      value: "unknown"
    },
  ],
}
```
