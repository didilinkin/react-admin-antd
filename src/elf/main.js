// JS 处理CSS样式
import * as c   from './helpers/Color'
import * as v   from './helpers/Variable'
import * as e   from './helpers/Extend'
import * as m   from './helpers/Mixins'
import * as f   from './helpers/Font'
import * as d   from './helpers/Distance'

class Elf {
    constructor (c, v, e, m, f, d) {
        this.c = c
        this.v = v
        this.e = e
        this.m = m
        this.f = f
        this.d = d
    }
}

const elf = new Elf(c, v, e, m, f, d)

export default elf
