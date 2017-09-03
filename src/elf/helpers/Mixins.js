// Elf 混合配置(有参数)

export const size = (width, height) => {
    return {
        'width': width,
        'height': height
    }
}

export const fS = (fontSize) => {
    return {
        'font-size': `${fontSize}px`
    }
}

// hotcss方法: 转换px到rem
let designWidth = 640

export const px2rem = (px) => {
    return {
        'font-size': px * 320 / designWidth / 20 + 'rem'
    }
}

// flex 居中混合
export const flexCenter = () => {
    return {
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center'
    }
}

// 图片宽度自适应
export const imgCover = (width) => {
    return {
        'width': width, // 只接受百分比
        'object-fit': 'cover'
    }
}

export const bCimg = (obj) => {
    return {
        'background-image': `url(${obj})`, // 传入 背景图 对象
        'background-size': 'cover'
    }
}
