import { useState } from 'react'

interface ToDoListProps {
    content: string;
    completed: boolean;
    onToggle: () => void;
}

function ToDoList({content, completed, onToggle}: ToDoListProps) {
    return(
        <div className="flex flex-row py-2">
            <li className={`mx-auto basis-13/20 rounded-lg font-bold ${completed ? "text-gray-600 line-through" : "text-purple-900"}`}>{content}</li>
            <button 
                className="basis-1/5 mx-auto basis-2/10 rounded-lg bg-purple-100 text-purple-800 font-bold hover:bg-purple-400 hover:text-white hover:cursor-pointer" 
                onClick={onToggle}
            >
                완료
            </button>
        </div>
    );
}

export default function ToDoListSystem() {
    const [arr, setArr] = useState<{ content: string; completed: boolean }[]>([]);
    const [inputValue, setInputValue] = useState<string>('');    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
    const addContent = () => {
        if (inputValue.trim() !== '') {
            setArr([...arr, { content: inputValue, completed: false }]);
            setInputValue('');
        }
    };
    const toggleComplete = (index: number) => {
        setArr(arr.map((item, i) => 
            i === index ? { ...item, completed: !item.completed } : item
        ));
    };
    return(
        <div className="bg-purple-200 h-screen w-screen">
            <p className="text-6xl text-purple-500 font-bold text-center py-6">To do list</p>
            <div className="w-120 h-130 mx-auto rounded-3xl bg-white border-2 border-purple-500">
                <div className="flex flex-row py-7">
                    <input
                        className="mx-auto basis-13/20 rounded-lg border-3 border-purple-500"
                        value={inputValue}
                        onChange={handleChange}
                    />
                    <button className="mx-auto basis-2/10 rounded-lg bg-purple-300 text-purple-900 font-bold hover:bg-purple-600 hover:text-white hover:cursor-pointer"
                        onClick={addContent}
                    >
                        추가
                    </button>
                </div>
                <ul>
                    {arr.map((item, index) => (
                        <ToDoList 
                            key={index} 
                            content={item.content} 
                            completed={item.completed} 
                            onToggle={() => toggleComplete(index)} 
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}