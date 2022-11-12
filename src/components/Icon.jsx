import { ReactComponent as back } from '~/assets/images/icons/back.svg'
import { ReactComponent as check } from '~/assets/images/icons/check.svg'
import { ReactComponent as leftArrow } from '~/assets/images/icons/arrow-left.svg'
import { ReactComponent as profile } from '~/assets/images/icons/profile.svg'
import { ReactComponent as rightArrow } from '~/assets/images/icons/arrow-right.svg'
import { ReactComponent as remove } from '~/assets/images/icons/remove.svg'
import { ReactComponent as shield } from '~/assets/images/icons/shield.svg'

const icons = {
    back,
    check,
    leftArrow,
    profile,
    rightArrow,
    remove,
    shield
}

export function Icon({icon, ...props}) {
    const Element = icons[icon]
    return <Element {...props} />
}