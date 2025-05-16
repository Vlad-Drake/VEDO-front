export function FormRowLayout({
    text,
    input,
    required = false,
}:{
    text: string,
    required?: boolean,
    input: React.ReactNode
}) {
    return (
        <div className="flex flex-row gap-10 justify-center">
            <p className={`w-[200px] content-center text-left ${required ? 'font-bold' : ''}`}>{text}</p>
            {input}
        </div>
    );
}