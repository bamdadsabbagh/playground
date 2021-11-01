export function keepNote (
    {
        output,
        channel,
        note,
        color,
    },
) {

    const duration = 3600000 // 1 hour

    output.playNote (
        note,
        channel,
        {
            duration,
            rawVelocity: true,
            velocity: color,
        },
    )

}