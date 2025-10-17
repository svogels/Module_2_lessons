# Interactive Question Answer Checking System
## Module 2: IP, Ethics and Privacy

This document explains the answer checking system that has been implemented for the interactive questions.

## Features

- ✅ **Submit Button**: Students can submit their answers
- ❌ **Immediate Feedback**: Correct/Incorrect feedback shown immediately
- ↻ **Try Again Button**: Appears after incorrect answers, allows retry
- 🔒 **Lock on Success**: Questions lock after correct answer to prevent changes

## Question Types Supported

### 1. Multiple Choice (MC)
**Color**: Green (#28a745)
**Pattern**:
```html
<div style="...">
    <!-- Question content with radio buttons -->
    <div style="margin-top: 15px; text-align: center;">
        <button id="QUESTION-ID-submit" onclick="checkMultipleChoice('QUESTION-ID', 'CORRECT-LETTER')" 
                style="...">✓ Submit Answer</button>
        <button id="QUESTION-ID-retry" onclick="retryQuestion('QUESTION-ID', 'radio')" 
                style="display: none; ...">↻ Try Again</button>
    </div>
    <div id="QUESTION-ID-feedback"></div>
</div>
```

**Examples**:
- `checkMultipleChoice('q1-copyright', 'b')` - Answer is 'B'
- `checkMultipleChoice('q4-copyright', 'b')` - Answer is 'B'

### 2. True/False (TF)
**Color**: Red (#dc3545)
**Pattern**:
```html
<div style="...">
    <!-- Question with True/False radio buttons -->
    <div style="margin-top: 15px; text-align: center;">
        <button id="QUESTION-ID-submit" onclick="checkTrueFalse('QUESTION-ID', 'true')" 
                style="...">✓ Submit Answer</button>
        <button id="QUESTION-ID-retry" onclick="retryQuestion('QUESTION-ID', 'radio')" 
                style="display: none; ...">↻ Try Again</button>
    </div>
    <div id="QUESTION-ID-feedback"></div>
</div>
```

**Examples**:
- `checkTrueFalse('q6-copyright-tf', 'false')` - Answer is False
- `checkTrueFalse('q1-edu-basics', 'false')` - Answer is False

### 3. Fill in the Blank (FIB)
**Color**: Blue (#007bff)
**Pattern**:
```html
<div id="QUESTION-ID" style="...">
    <!-- Question with text input(s) -->
    <div style="margin-top: 15px; text-align: center;">
        <button id="QUESTION-ID-submit" 
                onclick="checkFillInBlank('QUESTION-ID', [['answer1', 'alt1'], ['answer2']])" 
                style="...">✓ Submit Answer</button>
        <button id="QUESTION-ID-retry" onclick="retryQuestion('QUESTION-ID', 'text')" 
                style="display: none; ...">↻ Try Again</button>
    </div>
    <div id="QUESTION-ID-feedback"></div>
</div>
```

**Examples**:
- `checkFillInBlank('q2-fillblank-intro', [['70', 'seventy']])` - Accept "70" or "seventy"
- `checkFillInBlank('q1-fair-dealing', [['research', 'study'], ['criticism', 'review'], ['news']])` - Multiple blanks, multiple accepted answers

### 4. Matching (MATCH)
**Color**: Purple (#6f42c1)
**Pattern**:
```html
<div id="QUESTION-ID" style="...">
    <!-- Matching question with text inputs -->
    <div style="margin-top: 15px; text-align: center;">
        <button id="QUESTION-ID-submit" 
                onclick="checkMatching('QUESTION-ID', ['1', '3', '2', '4'])" 
                style="...">✓ Submit Answer</button>
        <button id="QUESTION-ID-retry" onclick="retryQuestion('QUESTION-ID', 'text')" 
                style="display: none; ...">↻ Try Again</button>
    </div>
    <div id="QUESTION-ID-feedback"></div>
</div>
```

**Examples**:
- `checkMatching('q3-matching-intro', ['1', '3', '2', '4'])` - A=1, B=3, C=2, D=4
- `checkMatching('q2-permission', ['1', '2', '3'])` - A=1, B=2, C=3

## Answer Keys

### Reading 1: Introduction to Copyright in Australia
- Q1 (MC): `q1-copyright` = **'b'** (Automatic as soon as you create)
- Q2 (FIB): `q2-fillblank-intro` = **[['70', 'seventy']]**
- Q3 (MATCH): `q3-matching-intro` = **['1', '3', '2', '4']**
  - A) Fair Dealing = 1 (limited circumstances)
  - B) Infringement = 3 (without permission)
  - C) Creative Commons = 2 (alternative licensing)
  - D) Public Domain = 4 (no longer protected)
- Q4 (MC): `q4-copyright` = **'b'** (Prevent criticism - NOT a right)
- Q6 (TF): `q6-copyright-tf` = **'false'** (Internet content IS protected)

### Reading 2: Education - Copyright Basics
- Q1 (TF): `q1-edu-basics` = **'false'** (Educational use has limitations)
- Q2 (MC): `q2-edu-basics` = **'b'** (10% or one chapter)
- Q3 (LIST): `q3-edu-basics` = Open answer (research, study, education)
- Q4 (FIB): `q4-edu-basics` = **[['copyright agency', 'statutory licence']]**
- Q5 (SCENARIO): Open answer

### Reading 3: Fair Dealing
- Q1 (FIB): `q1-fair-dealing` = **[['research', 'study'], ['criticism', 'review'], ['news', 'reporting', 'parody', 'satire']]**
- Q2 (TF): `q2-fair-dealing` = **'false'** (Amount matters)
- Q3 (MC): `q3-fair-dealing` = **'c'** (Popularity NOT a factor)
- Q4 (LIST): Open answer
- Q5 (SCENARIO): Open answer

### Reading 4: Permission - Do I Need It?
- Q1 (MC): `q1-permission` = **'b'** (When no exception applies)
- Q2 (MATCH): `q2-permission` = **['1', '2', '3']**
  - A) Quoting 50 words = 1 (No permission - fair dealing)
  - B) Full song on YouTube = 2 (Permission needed)
  - C) Creative Commons image = 3 (Check licence)
- Q3 (OPEN): Open answer
- Q4 (SCENARIO): Open answer

### Reading 5: Infringement Offences and Penalties
- Q1 (MC): `q1-infringement` = **'b'** (Using exclusive rights without permission)
- Q2 (FIB): `q2-infringement` = **[['civil'], ['criminal']]**
- Q3 (LIST): Open answer
- Q4 (TF): `q4-infringement` = **'false'** (Commercial use NOT required)
- Q5 (SCENARIO): Open answer

### Reading 6: Copyright Issues - Internet and Downloading
- Q1 (TF): `q1-internet` = **'false'** (Internet content NOT public domain)
- Q2 (MC): `q2-internet` = **'b'** (Use Creative Commons or get permission)
- Q3 (LIST): Open answer
- Q4 (FIB): `q4-internet` = **[['uploader', 'sharer'], ['downloader', 'receiver']]**
- Q5 (SCENARIO): Open answer

### Reading 7: How to Protect Your Work
- Q1 (MC): `q1-protect` = **'b'** (Watermarks, notices, metadata)
- Q2 (MATCH): `q2-protect` = **['2', '1', '3']**
  - A) Copyright notice (©) = 2 (States ownership rights)
  - B) Watermark = 1 (Visibly identifies ownership)
  - C) Creative Commons = 3 (Controlled sharing)
- Q3 (FIB): `q3-protect` = **[['automatic'], ['material', 'tangible', 'fixed']]**
- Q4 (OPEN): Open answer
- Q5 (SCENARIO): Open answer

### Reading 8: Music Copyright
- Q1 (FIB): `q1-music` = **[['musical work', 'composition'], ['sound recording', 'recording']]**
- Q2 (MC): `q2-music` = **'b'** (Record label or producer)
- Q3 (TF): `q3-music` = **'false'** (Credit alone isn't enough)
- Q4 (LIST): Open answer
- Q5 (SCENARIO): Open answer

## Implementation Status

### ✅ Completed (Already have submit buttons):
- Reading 1, Q1 (MC)
- Reading 1, Q2 (FIB)
- Reading 1, Q3 (MATCH)

### ⏳ To Be Implemented (Need submit buttons added):
All other questions listed above

## How to Add Submit Buttons

1. **Wrap the question** in a div with an ID (for FIB and MATCH):
   ```html
   <div id="unique-question-id" style="...">
   ```

2. **Add buttons before closing </div>**:
   ```html
   <div style="margin-top: 15px; text-align: center;">
       <button id="QUESTION-ID-submit" onclick="FUNCTION_NAME(...)" style="...">✓ Submit Answer</button>
       <button id="QUESTION-ID-retry" onclick="retryQuestion('QUESTION-ID', 'TYPE')" style="display: none; ...">↻ Try Again</button>
   </div>
   <div id="QUESTION-ID-feedback"></div>
   ```

3. **Use correct button color** matching question type:
   - MC: `#28a745` (green)
   - TF: `#dc3545` (red)
   - FIB: `#007bff` (blue)
   - MATCH: `#6f42c1` (purple)

## Testing

Open the HTML file in a browser and:
1. Answer a question
2. Click "Submit Answer"
3. Check feedback appears (green for correct, red for incorrect)
4. If incorrect, click "Try Again" to reset
5. Verify question locks after correct answer

## Notes

- Short answer and scenario questions remain open-ended (no answer checking)
- Questions with textareas are for longer responses (no automatic checking)
- Only objective questions (MC, TF, FIB, MATCH) have answer checking
