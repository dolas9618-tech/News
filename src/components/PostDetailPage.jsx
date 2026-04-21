import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PostDetailPage() {
    const { id } = useParams();
    const [news, setNews] = useState({});
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const [postRes, commRes] = await Promise.all([
                    axios.get(`https://dea920a762b902b2.mokky.dev/posts${id}`),
                    axios.get(`https://dea920a762b902b2.mokky.dev/comments?postId=${id}`)
                ]);
                setNews(postRes.data);
                setComments(commRes.data);
            } catch (e) { console.error("Ошибка загрузки данных", e); }
        }
        fetchData();
    }, [id]);

    async function submitComment(e) {
        e.preventDefault();
        if (!commentText.trim()) return;
        setIsSubmitting(true);

        try {
            const commentObj = {
                postId: id,
                text: commentText,
                createdAt: new Date().toLocaleString('ru-RU')
            };
            const response = await axios.post('https://dea920a762b902b2.mokky.dev/comments', commentObj);
            setComments([response.data, ...comments]); // Новый коммент сразу летит вверх
            setCommentText('');
        } catch (e) { alert("Не удалось отправить"); }
        finally { setIsSubmitting(false); }
    }

    return (
        <div className="container" style={{ maxWidth: '800px', padding: '40px 20px' }}>
            <img src={news.image || "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=1200"} 
                 alt="" style={{ width: '100%', borderRadius: '15px', marginBottom: '20px' }} />
            
            <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{news.title}</h1>
            <p style={{ color: '#666', marginBottom: '30px' }}>{news.category} • {news.date}</p>
            
            <div style={{ lineHeight: '1.6', fontSize: '1.1rem', marginBottom: '50px' }}>
                {/* Тут будет текст новости из твоей базы */}
                Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты...
            </div>

            <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '40px 0' }} />

            <section className="comments">
                <h3>Обсуждение ({comments.length})</h3>
                
                {/* Форма комментария */}
                <form onSubmit={submitComment} style={{ marginBottom: '40px', background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #ddd' }}>
                    <textarea 
                        placeholder="Напишите, что вы думаете об этом..."
                        style={{ width: '100%', border: 'none', outline: 'none', resize: 'none', minHeight: '80px', fontSize: '1rem' }}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <div style={{ textAlign: 'right', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="filter-btn active"
                            style={{ padding: '10px 25px' }}
                        >
                            {isSubmitting ? 'Отправка...' : 'Опубликовать'}
                        </button>
                    </div>
                </form>

                {/* Список комментариев */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {comments.length > 0 ? comments.map(c => (
                        <div key={c.id} style={{ background: '#fcfcfc', padding: '15px', borderRadius: '10px', borderLeft: '4px solid #0056b3' }}>
                            <p style={{ margin: '0 0 5px 0' }}>{c.text}</p>
                            <small style={{ color: '#999' }}>{c.createdAt}</small>
                        </div>
                    )) : <p style={{ color: '#999' }}>Пока никто не оставил комментарий. Будьте первым!</p>}
                </div>
            </section>
        </div>
    );
}

export default PostDetailPage;