export function playNote (
    {
        output,
        channel,
        duration = 1000,
        note,
        color,
    },
) {

    output.playNote (
        note,
        channel,
        {
            duration: duration,
            rawVelocity: true,
            velocity: color,
        },
    )

}