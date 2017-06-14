// JS 处理CSS样式
import * as c   from './helpers/_Color'
import * as v   from './helpers/_Variable'
import * as e   from './helpers/_Extend'
import * as m   from './helpers/_Mixins'
import * as f   from './helpers/_Font'
import * as d   from './helpers/_Distance'

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
