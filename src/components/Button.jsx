import { tail } from 'tailed-js'
import styledBy from 'styled-by'

export function Button({children, styleType = 'on-primary', className, ...props}) {
    const classNames = tail`
        rounded-2xl
        py-3
        px-6
        w-full
        font-bold
        hover:opacity-90
        transition-all
        disabled:opacity-30
        disabled:cursor-not-allowed 

        ${styledBy('styleType', {
            'primary': 'bg-primary text-on-primary',
            'on-primary': 'bg-background text-primary-dark',
            'on-primary-outlined': 'bg-transparent border border-on-primary text-on-primary',
            'primary-link': 'text-primary inline w-auto'
        })}
        
        ${className}
    `

    return (
        <button {...props} className={classNames({styleType})}>
            {children}
        </button>
    )
}