import React, { useRef, useState, useEffect } from "react";
import test from '../data/test.mp3'
import { FaPlay } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom"; // Import useParams
import axios from "axios";
import stringSimilarity from 'string-similarity';

function ProductDetail() {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isCheck, setIsCheck] = useState(false);
    const [isToggled, setIsToggled] = useState(false);
    const [message, setMessage] = useState();
    const [isFinished, setIsFinished] = useState(false);
    const [segments, setSegments] = useState([]);
    const [segment, setSegment] = useState([]);
    const location = useLocation(); // Lấy thông tin về đường dẫn hiện tại
    // Sử dụng URLSearchParams để lấy token từ chuỗi `search`
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token'); // Lấy giá trị của `token`

    useEffect(() => {
        // Fetch exercises based on topic_id
        const fetchExercises = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/exercise-segments/${token}`);
                setSegments(response.data); // Save exercises to state
            } catch (err) {
                console.error("Error fetching exercises:", err);
            }
        };

        fetchExercises();
    }, [token]);
    const startOver = () => {
        setMessageInput("");
        setIsToggled(false);
    };
    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };
    const handleClick = () => {
        setIsCheck(false);
        setIsToggled(true);
        handleSubmit();
        // setIsToggled(!isToggled);
    };
    const [index, setIndex] = useState(1); // Khởi tạo state cho index
    const increaseIndex = () => {
        if (index < segments.length) {
            setIndex(index + 1); // Tăng index nếu không vượt quá số lượng phần tử
        }
    };
    const decreaseIndex = () => {
        if (index > 1) {
            setIndex(index - 1); // Giảm index nếu không nhỏ hơn 0
        }
    };

    const [transcript, setTransCrint] = useState(''); // Khởi tạo state cho index
    const [messageInput, setMessageInput] = useState({ transcript: '' }); // Câu trả lời người dùng
    const [comparisonResult, setComparisonResult] = useState(null); // Kết quả so sánh
   

    const handleSubmit = () => {
        const results = [{ segment: { transcript: segment.transcript } }]; // Gán giá trị ban đầu
        const correctAnswer = results[0]?.segment.transcript || ""; // Đáp án đúng 
        // Kiểm tra đáp án đúng
        if (!correctAnswer) {
            setMessage("Câu hỏi không có đáp án đúng!");
            return;
        }

        // Tách từ và so sánh từng từ
        const correctWords = (correctAnswer || "").trim().split(/\s+/);
        const userWords = (messageInput.transcript || "").trim().split(/\s+/);

        const maxLength = Math.max(correctWords.length, userWords.length);
        const result = Array.from({ length: maxLength }).map((_, index) => {
            const word = correctWords[index] || "";
            return {
                word,
                isCorrect: word.toLowerCase() === (userWords[index] || "").toLowerCase(),
            };
        });

        const matchPercentage = stringSimilarity.compareTwoStrings((correctAnswer || "").trim(), (messageInput.transcript || "").trim()) * 100;
        const allCorrect = result.every((item) => item.isCorrect);
        // Cập nhật kết quả và thông báo
        setComparisonResult(result);
        setMessage(matchPercentage == 100 ? "Câu trả lời đúng!" : `Câu trả lời sai! Mức độ chính xác: ${matchPercentage.toFixed(2)}%`);
    };

    useEffect(() => {
        // Tìm segment tương ứng
        const segment = segments.find((aa) => aa.segment_number === index);

        // Nếu tìm thấy segment và transcript khác giá trị hiện tại, cập nhật state
        if (segment) {
            setSegment(segment);
        }
    }, [segments, index]);
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load(); // Tải lại audio mới khi src thay đổi
        }
    }); // Lắng nghe thay đổi của audio_file


    if (!segment) return <div className="loading">Đang tải dữ liệu...</div>;
    return (
        <div className='p-4 py-20 lg:p-40'>
            <div className=''>
                <div className='font-semibold text-xl py-4'>Nghe Đoạn Âm Thanh Sau</div>
                <div className='flex gap-x-4 py-4'>
                    <button className="bg-green-200 px-2 border-2 rounded-full hover:bg-green-500" onClick={decreaseIndex}>{`<`}</button>
                    <div className='flex'>
                        {/* Hiển thị thông tin của segment tìm thấy */}
                        {segment ? (
                            <div>
                                {segment.segment_number}
                            </div>
                        ) : (
                            <div>Không có dữ liệu</div>
                        )}/{segments.length}
                    </div>
                    <button className="bg-green-200 px-2 border-2 rounded-full hover:bg-green-500" onClick={increaseIndex}>{`>`}</button>

                </div>


                <div className='flex gap-4'>
                    <audio controls ref={audioRef}
                    // onEnded={handleAudioEnd}
                    >
                        <source src={`${segment.audio_file}`} type="audio/mpeg" />
                    </audio>
                    <button className="bg-green-200 px-6   rounded-full font-semibold hover:bg-green-500 hover:text-white" onClick={togglePlay}>
                        {isPlaying ? <FaStop /> : <FaPlay />}
                    </button>
                </div>

            </div>
            <div className='h-[1px] bg-black my-4'></div>
            <div className='font-semibold text-xl py-2'>Nhập Nội Dung Câu Trả Lời</div>
            <form onSubmit={(e) => e.preventDefault()}>
                <textarea
                    id="message"
                    value={messageInput.transcript} // liên kết state với value của textarea
                    onChange={(e) => setMessageInput({ transcript: e.target.value })} // xử lý sự kiện khi giá trị thay đổi
                    className="rounded-sm p-2 bg-[#ffffff18] w-full h-40 resize-none border-2 border-gray-500"
                    placeholder="Message"
                    readOnly={isToggled}
                />
                <div className='w-full flex justify-between'>
                    {isToggled ? <div>{message}</div> : 'The results will appear here.'}
                    <button onClick={() => handleClick()}
                        className="bg-green-200 p-4 rounded-xl font-semibold hover:bg-green-500 hover:text-white" >
                        Submit
                    </button>
                </div>
            </form>
            {!isToggled ? '' :
                (<div className="bg-gray-100 p-4 my-2 rounded-xl">
                    <div className='flex justify-between'>
                        <div className='font-semibold text-xl py-4'>Nội dung</div>
                        <button onClick={() => startOver()}
                            className="bg-green-200 px-4 rounded-xl font-semibold hover:bg-red-500 hover:text-white" >
                            Rest
                        </button>
                    </div>

                    {comparisonResult.map((item, index) => (
                        <li key={index} style={{ color: item.isCorrect ? "green" : "red" }}>
                            {item.word} - {item.isCorrect ? "Đúng" : "Sai"}
                        </li>
                    ))}
                </div>)
            }
        </div>
    );
};

export default ProductDetail;
