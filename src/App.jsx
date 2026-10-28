
import { useState } from "react";
import styles from "./App.module.css";

function App() {
    const [list, setList] = useState([]);

    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("드라마");
    const [rating, setRating] = useState(5);

    // 추가.
    const addMovie = () => {
        if (title.trim() === "") {
            return;
        }

        const movie = {
            title: title,
            rating: Number(rating),
            genre: genre,
            completed: false
        };

        setList([...list, movie]);
        setTitle("");
    };

    // 삭제
    const deleteMovie = (index) => {
        setList(list.filter((movie, i) => i !== index));
    };

    // 완료
    const setCompleted = (index, completed) => {
        setList(
            list.map((movie, i) => {
                if (i === index) {
                    return {
                        ...movie,
                        completed: completed
                    };
                }

                return movie;
            })
        );
    };

    // 완료 수
    const completedCount = list.filter(
        (movie) => movie.completed
    ).length;

    return (
        <div className={styles.page}>
            <div className={styles.container}>

                {/* 제목 */}
                <div className={styles.header}>
                    <h1 className={styles.title}>
                        나의 영화 기록장
                    </h1>
                </div>

                {/* 추가 */}
                <fieldset className={styles.movieUp}>
                    <legend>영화 추가</legend>

                    <div className={styles.formRow}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="영화 제목"
                            value={title}
                            onChange={(event) =>
                                setTitle(event.target.value)
                            }
                        />

                        <select
                            className={styles.select}
                            value={genre}
                            onChange={(event) =>
                                setGenre(event.target.value)
                            }
                        >
                            <option value="드라마">드라마</option>
                            <option value="SF">SF</option>
                            <option value="액션">액션</option>
                            <option value="코미디">코미디</option>
                        </select>

                        <select
                            className={styles.select}
                            value={rating}
                            onChange={(event) =>
                                setRating(event.target.value)
                            }
                        >
                            <option value="5">별점 5점</option>
                            <option value="4">별점 4점</option>
                            <option value="3">별점 3점</option>
                            <option value="2">별점 2점</option>
                            <option value="1">별점 1점</option>
                        </select>

                        <button
                            className={styles.addButton}
                            onClick={addMovie}
                        >
                            추가
                        </button>
                    </div>
                </fieldset>

                {/* 개수 */}
                <div className={styles.countBox}>
                    <h2>
                        전체 <span>{list.length}</span>편
                        {" / "}
                        감상 완료 <span>{completedCount}</span>편
                    </h2>
                </div>

                {/* 목록 */}
                <div className={styles.movieList}>
                    {list.map((movie, index) => (
                        <div
                            key={index}
                            className={`${styles.movieCard} ${
    movie.completed
        ? styles.opacityCard
        : ""
}`}
                        >
                            {/* 제목 */}
                            <h3 className={styles.movieTitle}>
                                {movie.title}
                            </h3>

                            {/* 장르 */}
                            <p className={styles.movieInfo}>
                                장르: {movie.genre}
                            </p>

                            {/* 별점 */}
                            <p className={styles.rating}>
                                {"❤️".repeat(movie.rating)}
                                {"🤍".repeat(5 - movie.rating)}
                            </p>

                            {/* 감상 완료 + 삭제 */}
                            <div className={styles.cardBottom}>
                                <label className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={movie.completed}
                                        onChange={(event) =>
                                            setCompleted(
                                                index,
                                                event.target.checked
                                            )
                                        }
                                    />
                                    감상 완료
                                </label>

                                <button
                                    className={styles.deleteButton}
                                    onClick={() =>
                                        deleteMovie(index)
                                    }
                                >
                                    삭제
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default App;