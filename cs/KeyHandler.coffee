KeyList = []
KeyList.contains = (ref) ->
  x = 0;
  while x < KeyList.length
    if KeyList[x].ref == ref
      return true
    else
      x++
  return false
KeyList.list = ->
  y = 0
  while y < KeyList.length
    console.log(KeyList[y])
    y++

class ItemKey
  constructor: (@ref, @selected = false, @primary = "", @secondary = "", @grenade = [], @other = []) ->
    if selected
      ref.classList.add("savedKey")

    if !KeyList.contains(ref)
      KeyList.push(this)

  getValue: ->
    if this.ref.firstElementChild
      return this.ref.firstElementChild.innerHTML
    else
      return this.ref.innerHTML

  getString: ->
    grenadeS = ""
    otherS = ""
    if this.grenade.length > 0
      for g in this.grenade
        grenadeS += " " + g.value
    if this.other.length > 0
      for o in this.other
        otherS += " " + o.value
    return "bind " + "\"" + this.getValue() + "\" \"" + this.primary + this.secondary + grenadeS + otherS + "\"&#10;"
    # &#10; = new line

  select: ->
    this.selected = true
    this.ref.classList.add("savedKey")

  deSelect: ->
    this.selected = false
    this.ref.classList.remove("savedKey")

  containsArr: (arr, ref) ->
    x = 0;
    while x < arr.length
      if arr[x].id == ref.id
        return true
      else
        x++
    return false

  addInArray: (arr, ref) ->
    if !this.containsArr(arr, ref)
      arr.push(ref)
    else
      y = arr.length
      while y--
        if arr[y] == ref
          arr.splice(y, 1)



window.ItemKey = ItemKey
window.KeyList = KeyList