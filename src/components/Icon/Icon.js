import React from 'react';
import IconButton from 'material-ui/IconButton';

const Icon = (CustomIcon) => (props) => {
    return <IconButton {...props}><CustomIcon/></IconButton>;
};

export default Icon;