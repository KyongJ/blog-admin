import React, { FC } from 'react'
import{ReactComponent as LOGO} from '@/assets/img/logo.svg'
import Icon from '@ant-design/icons';
import './index.less'

interface Props {
    collapsed:boolean
}

const Logo:FC<Props> = (props) => {
    const {collapsed} = props
    return (
        <div className='side-logo'>
            <div className='logo-icon'><Icon component={LOGO} style={{fontSize:'32px'}}/></div>
            {
                !collapsed && <div className='title'><strong>Blog-Admin</strong></div>
            }
        </div>
    )
}

export default Logo
