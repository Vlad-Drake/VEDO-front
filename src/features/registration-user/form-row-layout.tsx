export function FormRowLayout({
    text,
    input
}:{
    text: string,
    input: React.ReactNode
}) {
    return (
        <div className="flex flex-row gap-10 justify-center">
            <p className="w-[200px] content-center text-left">{text}</p>
            {input}
        </div>
    );
}