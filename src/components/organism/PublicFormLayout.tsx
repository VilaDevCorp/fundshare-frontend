import { Typography } from '../ui/Typography';
import logo from '/logo.svg';

export function PublicFormLayout({
    children,
    onSubmit,
    title
}: {
    children: JSX.Element | JSX.Element[];
    onSubmit?: () => void;
    title?: string;
}) {
    return (
        <section
            className={`flex md:max-w-[500px] w-full p-8 
            rounded-[2px] md:h-auto md:max-h-[900px] md:m-auto flex-col gap-6 bg-background-0 `}
        >
            <img src={logo} alt="Logo" className=" self-center  w-[200px]" />
            <Typography type="title">{title}</Typography>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit && onSubmit();
                }}
                className="flex flex-col gap-6"
            >
                {children}
            </form>
        </section>
    );
}
