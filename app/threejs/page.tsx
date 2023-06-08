import MainCanvas from "../../components/MainCanvas";

const fileInfo = {
    userId: undefined,
    filename: undefined
}

export default function ThreeJsPage() {
    2
    return (
        <div className="h-full">
            <MainCanvas {...fileInfo} />
        </div>
    );
}