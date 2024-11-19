import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const logoRef = useRef<HTMLInputElement>(null);
    const companyRef = useRef<HTMLInputElement>(null);
    const positionRef = useRef<HTMLInputElement>(null);
    const newRef = useRef<HTMLInputElement>(null);
    const featuredRef = useRef<HTMLInputElement>(null);
    const timeRef = useRef<HTMLSelectElement>(null);
    const workTypeRef = useRef<HTMLSelectElement>(null);
    const workPlaceRef = useRef<HTMLSelectElement>(null);
    const skillRefs = useRef<Record<string, HTMLInputElement>>({});
    const [vacancies, setVacancies] = useState<any[]>([]);
    const [showAllSkills, setShowAllSkills] = useState(false);

    const skillsList = [
        "Frontend",
        "Senior",
        "HTML",
        "CSS",
        "JavaScript",
        "Fullstack",
        "Midweight",
        "Python",
        "React",
        "Junior",
        "Sass",
        "Ruby",
        "RoR",
        "Vue",
        "Django",
    ];

    useEffect(() => {
        const savedVacancies = localStorage.getItem("vacancies");
        if (savedVacancies) {
            setVacancies(JSON.parse(savedVacancies));
        }
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!logoRef.current?.value) {
            toast.error("Logotip URL kiriting");
            return;
        }
        if (!companyRef.current?.value) {
            toast.error("Kompaniya nomini kiriting");
            return;
        }
        if (!positionRef.current?.value) {
            toast.error("Lavozimni kiriting");
            return;
        }

        const selectedSkills = Object.keys(skillRefs.current).filter(
            (key) => skillRefs.current[key]?.checked
        );

        if (selectedSkills.length === 0) {
            toast.error("Kamida bitta ko'nikma tanlang");
            return;
        }

        const newVacancy = {
            logo: logoRef.current?.value || "/placeholder-logo.png",
            company: companyRef.current?.value || "",
            isNew: newRef.current?.checked || false,
            isFeatured: featuredRef.current?.checked || false,
            position: positionRef.current?.value || "",
            time: timeRef.current?.value || "",
            workType: workTypeRef.current?.value || "",
            workPlace: workPlaceRef.current?.value || "",
            skills: selectedSkills,
        };

        const updatedVacancies = [...vacancies, newVacancy];
        setVacancies(updatedVacancies);
        localStorage.setItem("vacancies", JSON.stringify(updatedVacancies));

        toast.success("Vakansiya muvaffaqiyatli qo'shildi!");
        if (e.target instanceof HTMLFormElement) {
            e.target.reset();
        }
    };

    return (
        <div>
            <header className="w-full">
                <img
                    className="w-full h-[80px] object-cover"
                    src="/headerImage.svg"
                    alt="Header Image"
                />
            </header>
            <form
                className="w-[500px] bg-white mx-auto rounded-md p-6"
                onSubmit={handleSubmit}
            >
                <h2 className="font-bold text-2xl mb-6">
                    Vakansiya ma'lumotlarini kiriting
                </h2>
                <div className="flex flex-col gap-3">
                    <label htmlFor="Logotip">Logotip URL</label>
                    <input
                        ref={logoRef}
                        type="text"
                        id="Logotip"
                        className="rounded outline-none border-2 p-2"
                        placeholder="Logotip URL kiriting"
                    />
                </div>
                <div className="mt-5 flex flex-col gap-3">
                    <label htmlFor="company">Kompaniya nomi</label>
                    <input
                        ref={companyRef}
                        className="rounded outline-none border-2 p-2"
                        id="company"
                        type="text"
                        placeholder="Kompaniya nomi"
                    />
                </div>
                <div className="mt-5 mb-4 flex gap-7">
                    <div className="flex gap-1">
                        <input
                            ref={newRef}
                            type="checkbox"
                            id="new"
                            value="new"
                            name="type"
                        />
                        <label htmlFor="new">Yangi</label>
                    </div>
                    <div className="flex gap-1">
                        <input
                            ref={featuredRef}
                            type="checkbox"
                            id="featured"
                            value="featured"
                            name="type"
                        />
                        <label htmlFor="featured">Featured</label>
                    </div>
                </div>
                <div className="my-5 flex flex-col gap-3">
                    <label htmlFor="position">Lavozim</label>
                    <input
                        ref={positionRef}
                        type="text"
                        id="position"
                        className="rounded outline-none border-2 p-2"
                        placeholder="Junior Frontend Developer"
                    />
                </div>
                <div className="flex gap-3 mb-7">
                    <div className="flex flex-col gap-3 w-1/3">
                        <label htmlFor="time">Vaqt</label>
                        <select
                            ref={timeRef}
                            id="time"
                            className="border-2 p-2 rounded-md"
                        >
                            <option>1d ago</option>
                            <option>2d ago</option>
                            <option>3d ago</option>
                            <option>1w ago</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-3 w-1/3">
                        <label htmlFor="workType">Ish turi</label>
                        <select
                            ref={workTypeRef}
                            id="workType"
                            className="border-2 p-2 rounded-md"
                        >
                            <option>Full Time</option>
                            <option>Part Time</option>
                            <option>Contract</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-3 w-1/3">
                        <label htmlFor="workPlace">Joylashuv</label>
                        <select
                            ref={workPlaceRef}
                            id="workPlace"
                            className="border-2 p-2 rounded-md"
                        >
                            <option>USA only</option>
                            <option>Remote</option>
                            <option>Worldwide</option>
                            <option>UK only</option>
                        </select>
                    </div>
                </div>
                <p className="font-bold text-xl mb-2">Ko'nikmalar</p>
                <div className="flex flex-wrap">
                    {skillsList
                        .slice(0, showAllSkills ? skillsList.length : 6)
                        .map((skill) => (
                            <div key={skill} className="w-1/2 flex gap-2">
                                <input
                                    ref={(el) => {
                                        if (el) skillRefs.current[skill] = el;
                                    }}
                                    type="checkbox"
                                    name="skill"
                                    id={skill}
                                    value={skill}
                                />
                                <label htmlFor={skill}>{skill}</label>
                            </div>
                        ))}
                </div>
                <button
                    type="button"
                    className="mt-3 text-blue-500 underline"
                    onClick={() => setShowAllSkills(!showAllSkills)}
                >
                    {showAllSkills ? "Hide Skills" : "Show All Skills"}
                </button>
                <button className="w-full bg-black text-white py-3 mt-5 rounded-md font-bold cursor-pointer">
                    Saqlash
                </button>
            </form>

            <ToastContainer />

            <div className="mt-10 w-[850px] mx-auto">
                <h2 className="text-2xl font-bold mb-5">
                    Vakansiyalar ro'yxati
                </h2>
                {vacancies.map((vacancy, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center p-4 border rounded mb-4 bg-white shadow-md"
                    >
                        <div className="flex gap-4 items-center">
                            <img
                                src={vacancy.logo || "/placeholder-logo.png"}
                                alt={vacancy.company}
                                className="w-12 h-12"
                            />
                            <div>
                                <p className="font-bold">{vacancy.company}</p>
                                <p>{vacancy.position}</p>
                                <p className="text-gray-500 text-sm">
                                    {vacancy.time} • {vacancy.workType} •{" "}
                                    {vacancy.workPlace}
                                </p>
                            </div>
                        </div>
                        <ul className="flex gap-3">
                            {vacancy.skills.map((skill: string) => (
                                <li
                                    key={skill}
                                    className="bg-gray-200 px-3 py-1 rounded"
                                >
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
