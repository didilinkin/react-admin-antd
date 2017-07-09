// Elf 混合配置(有参数)

export const size = (width, height) => {
    return {
        'width': width,
        'height': height
    }
}

export const fS = (fontSize) => {
    return {
        'font-size': fontSize
    }
}

// hotcss方法: 转换px到rem
let designWidth = 640

export const px2rem = (px) => {
    return {
        'font-size': px * 320 / designWidth / 20 + 'rem'
    }
}

// flex混合
export const flexCenter = () => {
    return {
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center'
    }
}
