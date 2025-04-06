from fastapi import APIRouter, Depends, HTTPException, Query
from utils.auth import get_current_user
from services import content_generator

router = APIRouter(
    prefix="/generateContent",
    tags=["Content Generation"]
)

@router.get("/{level}", summary="Generate New Content")
async def generate_new_content(
    level: int,
    difficulty: str = Query("easy", description="Difficulty level"),
    language: str = Query("English", description="Language to use")
    ):
    if level not in [2, 3]:
        raise HTTPException(status_code=400, detail="Content generation available only for levels 2 and 3.")
    if level == 2:
        content = content_generator.generate_words(10, difficulty, language)
    elif level == 3:
        content = content_generator.generate_sentences(3, difficulty, language)
    
    return {"content": content}

@router.post("/generateQuestion", summary="Generate a question from a sentence")
async def generate_question(sentence: str):
    question = content_generator.generate_question_from_sentence(sentence)
    return {"question": question}

@router.post("/checkAnswer", summary="Check if answer is correct")
async def check_answer(sentence: str, question: str, answer: str):
    verdict = content_generator.check_answer(sentence, question, answer)
    return {"verdict": verdict}
