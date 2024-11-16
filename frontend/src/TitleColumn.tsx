import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// define the props parameters
interface Props {
    columnName: string;
    sorting: string,
    onSelectSorting: (selectedSorting: string) => void;
}

// create the title name with the sort icons and return the sort value
const TitleColumn = ( { columnName, sorting, onSelectSorting }: Props ) => {

    const getSortOrderColor = (sortIcon: string): string => {
        if (sortIcon == sorting){
            return "text-red-600";
        }

        if (sortIcon == sorting){
            return "text-red-600";
        }

        return "text-black-600";
    }

    return (
        <div className="flex justify-center w-1/4">{columnName[0].toUpperCase() + columnName.substring(1)}&nbsp;
            <div className={ (getSortOrderColor(columnName)) } style={{ cursor: 'pointer' }} role="button"
                    onClick={ () => {
                        const sortValue = sorting == columnName ? "id" : columnName;
                        onSelectSorting(sortValue);
                        }}>
                <FontAwesomeIcon icon={faCaretUp} />
            </div>
            <div className={ (getSortOrderColor(`-${columnName}`)) } style={{ cursor: 'pointer' }} role="button"
                    onClick={ () => {
                        const sortValue = sorting == `-${columnName}` ? "-id" : `-${columnName}`;
                        onSelectSorting(sortValue);
                        }}>
                <FontAwesomeIcon icon={faCaretDown} />
            </div>
        </div>
    )
}

// make the component available to other files
export default TitleColumn;
