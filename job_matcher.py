import re


skills_db = {
    'developer': ['Python', 'JavaScript', 'React', 'Node.js', 'SQL'],
    'data analyst': ['Python', 'SQL', 'Excel', 'R', 'Tableau'],
}

def extract_skills(job_description):
    """ Extract relevant skills from job description using simple pattern matching """
    found_skills = []
    for job, skills in skills_db.items():
        for skill in skills:
            if re.search(rf'\b{skill}\b', job_description, re.IGNORECASE):
                found_skills.append(skill)
    return found_skills
