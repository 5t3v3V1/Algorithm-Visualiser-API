
function cell_class(char) {
    switch (char) {
        case "#":
            return "wall";

        case ".":
            return "super_light";

        case "?":
            return "light";

        case "~":
            return "medium";

        case "^":
            return "heavy";
        
        case "!":
            return "visited";

        case "*":
            return "path";


    };
};

function Cell({type}) {
    return <div className={`cell ${cell_class(type)}`}></div>;
}

export default Cell