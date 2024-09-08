from flask import Flask, request, jsonify
import requests  
from job_matcher import extract_skills

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze_job_application():
    try:
        data = request.get_json()
        job_title = data.get('jobTitle')
        company = data.get('company')
        description = data.get('description')
        
        if not job_title or not company or not description:
            return jsonify({'error': 'All fields are required'}), 400
        
        recommended_skills = extract_skills(description)

        go_response = requests.post('http://localhost:8080/job-fit', json={'description': description})
        
        if go_response.status_code == 200:
            fit_score = go_response.json().get('fitScore')
        else:
            fit_score = 0
        
        return jsonify({
            'fitScore': fit_score,
            'recommendedSkills': recommended_skills
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
