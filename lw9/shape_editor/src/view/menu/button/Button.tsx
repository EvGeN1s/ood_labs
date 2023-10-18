import "./Button.css"

type ButtonProps = {
    onClick: Function
    icon: JSX.Element
}

function Button(props: ButtonProps): JSX.Element {
    return (
        <div className="Button" onClick={() => {
            props.onClick()
        }}>
            {props.icon}
        </div>)
}

export default Button