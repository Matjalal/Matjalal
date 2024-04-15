'use client'
import { useState, useEffect } from "react";
import api from "../utils/api";
interface ingredientsInterface {
    id: string,
    name: string,
    type: string
}
interface IngredientCheckBoxProps {
    onIngredientChange: (ingredients: ingredientsInterface[]) => void;
    ingredientType: string
    maxChecked: number;
}
const IngredientCheckBox: React.FC<IngredientCheckBoxProps> = ({ onIngredientChange, ingredientType, maxChecked }) => {
    // 불러올 재료 
    const [ingredients, setIngredients] = useState<ingredientsInterface[]>([]);
    useEffect(() => {
        api.get(`/ingredients/type/${ingredientType}`)
            .then(response => setIngredients(response.data.data.ingredients))
            .catch(err => {
                console.log(err)
            })
    }, [])
    const [checkedCount, setCheckedCount] = useState<number>(0); // 체크된 재료의 수
    // 체크된 재료
    const [checkedingredients, setCheckedIngredients] = useState<ingredientsInterface[]>([]);
    const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement>, ingredient: ingredientsInterface) => {
        const isChecked = e.target.checked;
        // 현재 체크된 재료의 수
        const currentCheckedCount = isChecked ? checkedCount + 1 : checkedCount - 1;

        // 체크 가능 수를 초과하는지 확인
        if (currentCheckedCount > maxChecked) {
            // 초과하면 체크 이벤트 무시하고 이전 상태로 되돌리기
            e.preventDefault();
            e.target.checked = !isChecked; // 체크를 해제합니다.
            return;
        }

        // 체크된 재료의 수 갱신
        setCheckedCount(currentCheckedCount);
        if (isChecked) {
            setCheckedIngredients(prevIngredients => [...prevIngredients, { id: ingredient.id, name: ingredient.name, type: ingredient.type }]);
            // 해당 재료가 체크되면 ingredients 리스트에 추가

        } else {
            // 해당 재료가 체크 해제되면 ingredients 리스트에서 제거
            setCheckedIngredients(prevIngredients => {
                const newIngredients = prevIngredients.filter(ingredient => ingredient !== ingredient);
                return newIngredients;
            });
        }
    }
    useEffect(() => {
        onIngredientChange(checkedingredients);
    }, [checkedingredients, onIngredientChange]);

    return (
        <div className="relative flex-grow w-full">
            <label  className="text-lg font-bold">{ingredientType}</label>
            <br/>
            <label  className="text-sm font-bold">최대 {maxChecked}개!</label>
            {ingredients.map(ingredient =>
                <div>
                    <input type="checkbox" id={ingredient.id} name={ingredient.name} onChange={(e) => handleIngredientChange(e, ingredient)} className="w-4 h-4"/>
                    <label htmlFor={ingredient.name}>{ingredient.name}</label>
                </div>)}
        </div>
    )
}
export default IngredientCheckBox;