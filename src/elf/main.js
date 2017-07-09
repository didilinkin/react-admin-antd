// Elf 样式配置文件
import * as c   from './helpers/Color'
import * as e   from './helpers/Extend'
import * as m   from './helpers/Mixins'
import * as f   from './helpers/Font'
import * as d   from './helpers/Distance'

class Elf {
    constructor (c, e, m, f, d) {
        this.c = c
        this.e = e
        this.m = m
        this.f = f
        this.d = d
    }
}

const elf = new Elf(c, e, m, f, d)

export default elf
