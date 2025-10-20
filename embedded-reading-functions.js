// Shared JavaScript functions for embedded interactive readings

// Answer checking functions
function checkTrueFalse(questionId, correctAnswer) {
    const selectedRadio = document.querySelector(`input[name="${questionId}"]:checked`);
    const feedbackDiv = document.getElementById(`${questionId}-feedback`);
    const submitBtn = document.querySelector(`#${questionId}-container .btn-submit`);
    const retryBtn = document.getElementById(`${questionId}-retry`);
    
    if (!selectedRadio) {
        feedbackDiv.innerHTML = '<div class="feedback incorrect">⚠️ Please select an answer first.</div>';
        return;
    }
    
    const userAnswer = selectedRadio.value;
    const isCorrect = userAnswer === correctAnswer;
    
    if (isCorrect) {
        feedbackDiv.innerHTML = '<div class="feedback correct">✓ Correct! Well done.</div>';
        submitBtn.style.display = 'none';
    } else {
        feedbackDiv.innerHTML = '<div class="feedback incorrect">✗ Incorrect. Review the reading and try again.</div>';
        submitBtn.style.display = 'none';
        retryBtn.style.display = 'inline-block';
    }
}

function checkMultipleChoice(questionId, correctAnswer) {
    const selectedRadio = document.querySelector(`input[name="${questionId}"]:checked`);
    const feedbackDiv = document.getElementById(`${questionId}-feedback`);
    const submitBtn = document.querySelector(`#${questionId}-container .btn-submit`);
    const retryBtn = document.getElementById(`${questionId}-retry`);
    
    if (!selectedRadio) {
        feedbackDiv.innerHTML = '<div class="feedback incorrect">⚠️ Please select an answer first.</div>';
        return;
    }
    
    const userAnswer = selectedRadio.value;
    const isCorrect = userAnswer === correctAnswer;
    
    if (isCorrect) {
        feedbackDiv.innerHTML = '<div class="feedback correct">✓ Correct! Well done.</div>';
        submitBtn.style.display = 'none';
    } else {
        feedbackDiv.innerHTML = '<div class="feedback incorrect">✗ Incorrect. Review the reading and try again.</div>';
        submitBtn.style.display = 'none';
        retryBtn.style.display = 'inline-block';
    }
}

function checkFillInBlank(questionId, correctAnswers) {
    const feedbackDiv = document.getElementById(`${questionId}-feedback`);
    const submitBtn = document.querySelector(`#${questionId}-container .btn-submit`);
    const retryBtn = document.getElementById(`${questionId}-retry`);
    
    let allCorrect = true;
    const userAnswers = [];
    
    for (let i = 0; i < correctAnswers.length; i++) {
        const input = document.getElementById(`${questionId}-blank${i + 1}`);
        if (!input) continue;
        
        const userAnswer = input.value.trim().toLowerCase();
        userAnswers.push(userAnswer);
        
        const isCorrect = correctAnswers[i].some(answer => userAnswer === answer.toLowerCase());
        if (!isCorrect) {
            allCorrect = false;
        }
    }
    
    if (userAnswers.some(ans => ans === '')) {
        feedbackDiv.innerHTML = '<div class="feedback incorrect">⚠️ Please fill in all blanks.</div>';
        return;
    }
    
    if (allCorrect) {
        feedbackDiv.innerHTML = '<div class="feedback correct">✓ Correct! Well done.</div>';
        submitBtn.style.display = 'none';
    } else {
        feedbackDiv.innerHTML = '<div class="feedback incorrect">✗ Not quite right. Review the reading and try again.</div>';
        submitBtn.style.display = 'none';
        retryBtn.style.display = 'inline-block';
    }
}

function checkMatching(questionId, correctMatches) {
    const feedbackDiv = document.getElementById(`${questionId}-feedback`);
    const submitBtn = document.querySelector(`#${questionId}-container .btn-submit`);
    const retryBtn = document.getElementById(`${questionId}-retry`);
    
    let allCorrect = true;
    const userAnswers = [];
    
    for (let i = 0; i < correctMatches.length; i++) {
        const input = document.getElementById(`${questionId}-match${i + 1}`);
        if (!input) continue;
        
        const userAnswer = input.value.trim().toLowerCase();
        userAnswers.push(userAnswer);
        
        const isCorrect = correctMatches[i].some(answer => userAnswer === answer.toLowerCase());
        if (!isCorrect) {
            allCorrect = false;
        }
    }
    
    if (userAnswers.some(ans => ans === '')) {
        feedbackDiv.innerHTML = '<div class="feedback incorrect">⚠️ Please complete all matches.</div>';
        return;
    }
    
    if (allCorrect) {
        feedbackDiv.innerHTML = '<div class="feedback correct">✓ Correct! All matches are correct.</div>';
        submitBtn.style.display = 'none';
    } else {
        feedbackDiv.innerHTML = '<div class="feedback incorrect">✗ Some matches are incorrect. Review and try again.</div>';
        submitBtn.style.display = 'none';
        retryBtn.style.display = 'inline-block';
    }
}

function retryQuestion(questionId, inputType) {
    const feedbackDiv = document.getElementById(`${questionId}-feedback`);
    const submitBtn = document.querySelector(`#${questionId}-container .btn-submit`);
    const retryBtn = document.getElementById(`${questionId}-retry`);
    
    // Clear feedback
    feedbackDiv.innerHTML = '';
    
    // Clear inputs based on type
    if (inputType === 'radio') {
        const radios = document.querySelectorAll(`input[name="${questionId}"]`);
        radios.forEach(radio => radio.checked = false);
    } else if (inputType === 'text') {
        for (let i = 1; i <= 10; i++) {
            const input = document.getElementById(`${questionId}-blank${i}`);
            if (input) input.value = '';
            const match = document.getElementById(`${questionId}-match${i}`);
            if (match) match.value = '';
        }
    }
    
    // Show submit, hide retry
    submitBtn.style.display = 'inline-block';
    retryBtn.style.display = 'none';
}

// PDF Download Function
function downloadEmbeddedReading() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);
    const lineHeight = 6;
    let yPosition = margin;
    
    // Get title from page
    const pageTitle = document.querySelector('.reading-header h1').textContent.replace('📚 ', '');
    
    // Title
    doc.setFontSize(18);
    doc.setTextColor(102, 126, 234);
    doc.text(pageTitle, margin, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.setTextColor(118, 75, 162);
    doc.text('Interactive Reading - Your Answers', margin, yPosition);
    yPosition += 8;
    
    // Date
    const today = new Date();
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Completed: ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`, margin, yPosition);
    yPosition += 15;
    
    // Helper functions
    function checkPageBreak(additionalSpace = 15) {
        if (yPosition + additionalSpace > pageHeight - margin) {
            doc.addPage();
            yPosition = margin;
            return true;
        }
        return false;
    }
    
    function addWrappedText(text, x, startY, maxWidth, lineHeight) {
        const lines = doc.splitTextToSize(text, maxWidth);
        let currentY = startY;
        
        lines.forEach((line) => {
            if (currentY + lineHeight > pageHeight - margin) {
                doc.addPage();
                currentY = margin;
            }
            doc.text(line, x, currentY);
            currentY += lineHeight;
        });
        
        yPosition = currentY;
        return currentY;
    }
    
    // Collect all questions
    const questionContainers = document.querySelectorAll('.embedded-question');
    
    questionContainers.forEach((container, index) => {
        checkPageBreak(25);
        
        const questionNum = container.querySelector('.question-badge').textContent;
        const questionType = container.querySelector('.question-type').textContent;
        const questionText = container.querySelector('.question-text').textContent;
        
        // Question header
        doc.setFontSize(11);
        doc.setTextColor(102, 126, 234);
        yPosition = addWrappedText(`${questionNum} (${questionType}): ${questionText}`, margin, yPosition, maxWidth, lineHeight);
        yPosition += 2;
        
        // Get answer based on question type
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        
        // Check for radio buttons (MC or T/F)
        const radioButtons = container.querySelectorAll('input[type="radio"]');
        if (radioButtons.length > 0) {
            const checkedRadio = container.querySelector('input[type="radio"]:checked');
            if (checkedRadio) {
                const label = checkedRadio.parentElement.textContent.trim();
                yPosition = addWrappedText(`Answer: ${label}`, margin + 5, yPosition, maxWidth - 5, lineHeight);
            } else {
                doc.setTextColor(150, 150, 150);
                yPosition = addWrappedText('Answer: Not answered', margin + 5, yPosition, maxWidth - 5, lineHeight);
                doc.setTextColor(60, 60, 60);
            }
        }
        
        // Check for inline blanks (Fill in blank)
        const inlineBlanks = container.querySelectorAll('.inline-blank');
        if (inlineBlanks.length > 0) {
            let answers = [];
            inlineBlanks.forEach((input, idx) => {
                const value = input.value.trim();
                answers.push(`${idx + 1}: ${value || 'Not answered'}`);
            });
            yPosition = addWrappedText(`Answers: ${answers.join(', ')}`, margin + 5, yPosition, maxWidth - 5, lineHeight);
        }
        
        // Check for text inputs (matching)
        const textInputsInQuestion = container.querySelectorAll('input[type="text"]:not(.inline-blank)');
        if (textInputsInQuestion.length > 0) {
            textInputsInQuestion.forEach((input, idx) => {
                const value = input.value.trim();
                if (value) {
                    yPosition = addWrappedText(`${idx + 1}: ${value}`, margin + 5, yPosition, maxWidth - 5, lineHeight);
                } else {
                    doc.setTextColor(150, 150, 150);
                    yPosition = addWrappedText(`${idx + 1}: Not answered`, margin + 5, yPosition, maxWidth - 5, lineHeight);
                    doc.setTextColor(60, 60, 60);
                }
            });
        }
        
        // Check for textarea (explanation or scenario)
        const textareas = container.querySelectorAll('textarea.text-input');
        if (textareas.length > 0) {
            textareas.forEach((textarea) => {
                if (textarea.value.trim()) {
                    doc.setTextColor(80, 80, 80);
                    yPosition += 2;
                    yPosition = addWrappedText(`Response: ${textarea.value.trim()}`, margin + 5, yPosition, maxWidth - 5, lineHeight);
                }
            });
        }
        
        yPosition += 6;
    });
    
    // Summary section
    const summary = document.getElementById('summary-text')?.value;
    if (summary && summary.trim()) {
        checkPageBreak(30);
        yPosition += 5;
        
        doc.setFontSize(12);
        doc.setTextColor(102, 126, 234);
        doc.text('Summary', margin, yPosition);
        yPosition += 7;
        
        doc.setFontSize(10);
        doc.setTextColor(40, 40, 40);
        yPosition = addWrappedText(summary.trim(), margin, yPosition, maxWidth, lineHeight);
    }
    
    // Add page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    }
    
    // Save
    const filename = `${pageTitle.replace(/[^a-z0-9]/gi, '_')}_${today.getFullYear()}_${(today.getMonth()+1).toString().padStart(2,'0')}_${today.getDate().toString().padStart(2,'0')}.pdf`;
    doc.save(filename);
}

// Auto-resize textareas
function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

document.addEventListener('DOMContentLoaded', function() {
    const textareas = document.querySelectorAll('textarea');
    
    textareas.forEach(textarea => {
        autoResizeTextarea(textarea);
        
        textarea.addEventListener('input', function() {
            autoResizeTextarea(this);
        });
        
        textarea.addEventListener('paste', function() {
            setTimeout(() => autoResizeTextarea(this), 0);
        });
    });
});
