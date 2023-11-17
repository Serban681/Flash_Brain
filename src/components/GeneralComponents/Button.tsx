export default function Button(props:any) {

    const buttonText = props.text;
    const callbackFunction = props.function;

    return (
        <button onClick={callbackFunction} style={{
            backgroundColor: 'var(--blue)',
            borderRadius: 5,
            color: 'white',
            padding: 10,
            fontFamily: 'var(--font-josefin)',
            fontWeight: 'bold',
            fontSize: 20,
            width: 150

        }}>{buttonText}</button>
    )

}