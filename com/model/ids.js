export default `
package I<#- v.interfaceName #>

type DS interface {
	// Create 创建 
	Create<#- c.signName()#>(ctx context.Context, req Create<#- c.signName() #>Request) (<#= h.firstLow(v.structName) #> m.<#= v.structName #>, err error)
<#if (c.needUpdate()) { -#>
	// Update 更新
	Update<#- c.signName()#>(ctx context.Context, req Update<#- c.signName()#>Request) (err error)
<# } -#>
	// <#- c.signName(v.structName) #>s 查询(所有)
	<#- c.signName(v.structName) #>s(ctx context.Context) (list []m.<#= v.structName #>, err error)
	// <#- c.signName(v.structName) #> 查询(单)
	<#- c.signName(v.structName) #>(ctx context.Context, <#= c.primaryKeyGoVarType() #>) (<#= h.firstLow(v.structName) #> m.<#= v.structName #>, has<#= v.structName #> bool,err error)
	// Must<#- c.signName()#> 查询(单), 必定存在,不存在返回 xerr.Reject 数据不存在
	Must<#- c.signName()#>(ctx context.Context, <#= c.primaryKeyGoVarType() #>) (<#= h.firstLow(v.structName) #> m.<#= v.structName #>, err error)
	// Has<#- c.signName()#> 存在(单)
	Has<#- c.signName()#>(ctx context.Context, <#= c.primaryKeyGoVarType() #>) (has bool, err error)
	// Have<#- c.signName()#> 存在(多) 入参主键的数量与数据库中数据的数量相等则返回 true
	Have<#- c.signName()#>(ctx context.Context, <#= h.firstLow(v.structName) #>IDs []m.ID<#= v.structName #>) (have bool, err error)
<# if (c.needPaging()) { -#>	// Paging 分页
	Paging(ctx context.Context, req Paging<#- c.signName()#>Request) (reply Paging<#- c.signName()#>Reply, err error)
<# } -#>
} 

<#if (c.needPaging()) { -#>  
type Paging<#- c.signName()#>Request struct {	
<# c.pagingReqFields().forEach(function (item) { -#>
    <#= c.padGoField(item) #><#= c.padGoType(item, "m.") #>
<# }) -#>
    m.Paging
}
type Paging<#- c.signName()#>Reply struct {
    List []Paging<#- c.signName()#>ReplyItem \`json:"list"\`
    Total uint64 \`json:"total"\`
}
type Paging<#- c.signName()#>ReplyItem struct {
<# c.pagingReplyFields().forEach(function (item) { -#>
    <#= c.padGoField(item) #> <#= c.padGoType(item, "m.") #>  \`json:"<#= h.firstLow(h.snakeToCamel(item.column)) #>"\`
<# }) -#>
}
<# } -#>
<#if (c.needUpdate()) { -#>
type Update<#- c.signName()#>Request struct {
<#= c.primaryKeyGoStructFieldType() #>
<# c.updateFields().forEach(function (item) { -#>
    <#= c.padGoField(item) #><#= c.padGoType(item) #>
<# }) -#>
}
func (v Update<#- c.signName()#>Request) VD(r *vd.Rule) (err error) {
	// TODO: add validation rule 
	return
}
<# }-#>
type Create<#- c.signName()#>Request struct {
<# c.createFields().forEach(function (item) { -#>
    <#= c.padGoField(item) #><#= c.padGoType(item, "m.") #>
<# }) -#>
}
func (v Create<#- c.signName()#>Request) VD(r *vd.Rule) (err error) {
    // TODO: add validation rule
    return
}
`