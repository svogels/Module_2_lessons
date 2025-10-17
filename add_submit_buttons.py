#!/usr/bin/env python3
"""
Script to add submit/retry buttons and feedback divs to all interactive questions
in the copyright HTML file.
"""

import re

# Read the HTML file
with open('2-dot-1-1-ip-ethics-and-privacy copy.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Define answer keys for all questions
# Format: {question_id: {'type': 'mc|tf|fib|matching', 'answer': correct_answer(s)}}
answer_keys = {
    # Reading 1: Introduction to Copyright in Australia
    'q1-copyright': {'type': 'mc', 'answer': 'b'},
    'q2-fillblank-intro': {'type': 'fib', 'answer': [['70', 'seventy']]},
    'q3-matching-intro': {'type': 'matching', 'answer': ['1', '3', '2', '4']},
    'q4-copyright': {'type': 'mc', 'answer': 'b'},
    'q6-copyright-tf': {'type': 'tf', 'answer': 'false'},
    
    # Reading 2: Education - Copyright Basics
    'q1-edu-basics': {'type': 'tf', 'answer': 'false'},
    'q2-edu-basics': {'type': 'mc', 'answer': 'b'},
    
    # Reading 3: Fair dealing
    'q1-fair-dealing': {'type': 'fib', 'answer': [['research', 'study'], ['criticism', 'review'], ['news', 'reporting', 'parody', 'satire']]},
    'q2-fair-dealing': {'type': 'tf', 'answer': 'false'},
    'q3-fair-dealing': {'type': 'mc', 'answer': 'c'},
    
    # Reading 4: Permission
    'q1-permission': {'type': 'mc', 'answer': 'b'},
    'q2-permission': {'type': 'matching', 'answer': ['1', '2', '3']},
    
    # Reading 5: Infringement
    'q1-infringement': {'type': 'mc', 'answer': 'b'},
    'q4-infringement': {'type': 'tf', 'answer': 'false'},
    
    # Reading 6: Internet copyright
    'q1-internet': {'type': 'tf', 'answer': 'false'},
    'q2-internet': {'type': 'mc', 'answer': 'b'},
    
    # Reading 7: Protect work
    'q1-protect': {'type': 'mc', 'answer': 'b'},
    'q2-protect': {'type': 'matching', 'answer': ['2', '1', '3']},
    
    # Reading 8: Music copyright
    'q2-music': {'type': 'mc', 'answer': 'b'},
    'q3-music': {'type': 'tf', 'answer': 'false'},
}

# Function to add buttons and feedback for Multiple Choice questions
def add_mc_buttons(match, q_id, answer):
    question_html = match.group(0)
    
    # Check if buttons already exist
    if f'id="{q_id}-submit"' in question_html:
        return question_html
    
    # Find the closing </div> of the question
    # Add buttons before the closing tag
    button_html = f'''        <div style="margin-top: 15px; text-align: center;">
            <button id="{q_id}-submit" onclick="checkMultipleChoice('{q_id}', '{answer}')" style="padding: 8px 20px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin-right: 10px;">✓ Submit Answer</button>
            <button id="{q_id}-retry" onclick="retryQuestion('{q_id}', 'radio')" style="display: none; padding: 8px 20px; background: #ffc107; color: #000; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">↻ Try Again</button>
        </div>
        <div id="{q_id}-feedback"></div>
    </div>'''
    
    # Replace the closing </div> with buttons + closing </div>
    question_html = re.sub(r'(\s*)</div>(\s*)$', r'\1' + button_html, question_html)
    return question_html

# Function to add buttons for True/False questions
def add_tf_buttons(match, q_id, answer):
    question_html = match.group(0)
    
    # Check if buttons already exist
    if f'id="{q_id}-submit"' in question_html:
        return question_html
    
    button_html = f'''        <div style="margin-top: 15px; text-align: center;">
            <button id="{q_id}-submit" onclick="checkTrueFalse('{q_id}', '{answer}')" style="padding: 8px 20px; background: #dc3545; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin-right: 10px;">✓ Submit Answer</button>
            <button id="{q_id}-retry" onclick="retryQuestion('{q_id}', 'radio')" style="display: none; padding: 8px 20px; background: #ffc107; color: #000; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">↻ Try Again</button>
        </div>
        <div id="{q_id}-feedback"></div>
    </div>'''
    
    question_html = re.sub(r'(\s*)</div>(\s*)$', r'\1' + button_html, question_html)
    return question_html

print("Script created. This is a template - manual updates recommended due to HTML complexity.")
print("The JavaScript functions have already been added to the file.")
print("\nPlease manually add submit buttons to remaining questions following this pattern:")
print("\n1. Multiple Choice: checkMultipleChoice('question-id', 'correct-letter')")
print("2. True/False: checkTrueFalse('question-id', 'true' or 'false')")
print("3. Fill-in-Blank: checkFillInBlank('question-id', [['answer1', 'alt1'], ['answer2']])")
print("4. Matching: checkMatching('question-id', ['1', '2', '3', '4'])")
