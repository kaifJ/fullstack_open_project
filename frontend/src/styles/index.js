export const propertyDetailsStyles = {
    card: { width: '100%', marginTop: '20px' },
    errorContainer: { display: 'flex', alignItems: 'center' },
    errorIcon: { marginRight: '8px', marginLeft: '10px' },
    cardMedia: {
        objectFit: 'cover',
        width: '100%',
        margin: '5px',
    },
    cardMedaDefault: {
        width: '50%',
        height: '50%',
        margin: '5px',
    },
    typographyUSD: { margin: '10px 0' },
    button: { marginRight: '10px' },
}

export const propertyFormStyles = {
    imageListContainer: { listStyleType: 'none', padding: 0 },
    imageListItem: { marginBottom: '10px' },
    imageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '5px',
    },
    imageSpan: {
        flex: 1,
        maxWidth: '70%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
}

export const dashboardStyles = {
    accountContainer: {
        position: 'fixed',
        bottom: '30px',
        left: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    addIcon: { fontSize: '36px', color: 'white' },
}

export const propertyListStyles = {
    iconStyle: { fontSize: '20px' },
}

export const infoModalStyles = {
    button: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        marginBottom: '20px',
    },
    typographyStyle: { margin: '10px 0' },
}

export const imageViewerStyles = {
    buttonContainer: { position: 'absolute', top: '10px', right: '10px' },
    iconContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    image: {
        objectFit: 'cover',
        width: '90%',
        height: '90%',
        margin: '5px',
    },
    iconStyle: { fontSize: '64px' },
    closeIconStyle: { fontSize: '32px' },
}

export const filterStyles = {
    iconButton: {
        borderRadius: 4,
        width: '20%',
        height: '5rem',
    },
    iconColor: {
        color: 'white',
    },
    textField: {
        marginLeft: '3rem',
        width: '300px',
        backgroundColor: 'white',
        borderRadius: '4px',
    },
}

export const emptyListStyles = {
    container: {
        textAlign: 'center',
        padding: '20px',
        marginTop: '20%'
    },
    iconStyle: {
        fontSize: '128px',
        marginBottom: '10px',
        color: '#ccc',
    }
}
