export default `package m
// You can change package name

// <#= v.name #> Generate by https://goclub.run/?k=enum
// ---------------------- DO NOT EDIT (Begin) ----------------------
import (
	xerr "github.com/goclub/error"
	"fmt"
)
// <#= v.name #>
// Source enums:
// <#- JSON.stringify(v) #>
type <#= v.name #> <#= v.type #>
// New<#= v.name #> Create <#= v.name #> by <#= v.type #>
func New<#= v.name #>(v <#= v.type #>)(<#= firstLetterToLowerCase(v.name) #> <#= v.name #>, err error) {
  <#= firstLetterToLowerCase(v.name) #> = <#= v.name #>(v)
  err = <#= firstLetterToLowerCase(v.name) #>.Validator()
  return
}
// <#= toTitle(v.type) #> return <#= v.name #> basic types
func (v <#= v.name #>) <#= toTitle(v.type) #> () <#= v.type #> { return <#= v.type #>(v)}

// Enum<#= v.name #> Example: if <#= firstLetterToLowerCase(v.name) #> == Enum<#= v.name #>().xxx {...}
func Enum<#= v.name #>() (e struct {
<# v.items.forEach(function (item) { -#>
  <#= item.field.padEnd(maxItemFieldLen) #> <#= v.name #>
<# }) -#>
}) {
<# v.items.forEach(function (item) { -#>
  e.<#= item.field.padEnd(maxItemFieldLen) #> = <#- govalue(v.type, item.value) #>
<# }) -#>
  return
}
func Enum<#= v.name #>ExampleSwitch () {
    _ = <#= backqueto #>
switch <# v.items.forEach(function (item) { -#><#= firstLetterToLowerCase(item.field) #><#= item.tailed #><# }) -#> := m.Enum<#= v.name #>Switch(); v {
<# v.items.forEach(function (item) { -#>
case <#= firstLetterToLowerCase(item.field) #>.<#= item.field #>:
    // @TODO write some code
<# }) -#>
default:
    err = xerr.New(fmt.Sprintf("<#= v.name #> can not be %v", v))
    return
}
<#= backqueto #>
}
// Enum<#= v.name #>Switch safe switch of all values
// example: m.Enum<#= v.name #>ExampleSwitch()
func Enum<#= v.name #>Switch() (
<# v.items.forEach(function (item) { -#>
    <#= firstLetterToLowerCase(item.field) #> struct {<#= item.field.padEnd(maxItemFieldLen) #> <#= v.name #>},
<# }) -#>
) {
    e := Enum<#= v.name #>()
    <# v.items.forEach(function (item) { -#>
<#= firstLetterToLowerCase(item.field) #>.<#= item.field #> = e.<#= item.field #>
    <# }) -#>
return
}
// Validator Verify data
func (v <#= v.name #>) Validator(custom ...error) error {
    outError := xerr.New(fmt.Sprintf("<#= v.name #> can not be %v", v))
    if len(custom) != 0 {
		outError = custom[0]
	}
    switch <# v.items.forEach(function (item) { -#><#= firstLetterToLowerCase(item.field) #><#= item.tailed #><# }) -#> := Enum<#= v.name #>Switch(); v {
    <# v.items.forEach(function (item) { -#>
    case <#= firstLetterToLowerCase(item.field) #>.<#= item.field#>:
    <# }) -#>
    default:
        return outError
    }
    return nil
}
// JavaScript code for https://github.com/2type/admin#_enum
/*
TA.enum.<#= firstLetterToLowerCase(v.name) #> = [
<# v.items.forEach(function (item) { -#>
    {
        key: "<#= item.field #>",
        value: <#- jsCodeValue(v, item) #>,
        label: "<#= item.label #>",
    },
<# }) -#>
]
*/
// ---------------------- DO NOT EDIT (End) ----------------------
`
