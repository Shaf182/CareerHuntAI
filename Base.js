import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList, StyleSheet } from 'react-native';

const Base = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [applications, setApplications] = useState([]);
  const [insights, setInsights] = useState(null);

  const handleAddApplication = () => {
    const application = {
      jobTitle,
      company,
      description
    };
    setApplications([...applications, application]);

    fetch('http://your-backend-url/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(application),
    })
      .then(response => response.json())
      .then(data => {
        setInsights(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track Your Job Applications</Text>

      <TextInput
        placeholder="Job Title"
        onChangeText={text => setJobTitle(text)}
        value={jobTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Company"
        onChangeText={text => setCompany(text)}
        value={company}
        style={styles.input}
      />
      <TextInput
        placeholder="Job Description"
        onChangeText={text => setDescription(text)}
        value={description}
        style={styles.input}
      />
      
      <Button title="Add Application" onPress={handleAddApplication} />

      <FlatList
        data={applications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.applicationContainer}>
            <Text style={styles.jobTitle}>{item.jobTitle} - {item.company}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />

      {insights && (
        <View style={styles.insightsContainer}>
          <Text style={styles.insightsTitle}>AI Insights</Text>
          <Text>Job Fit Score: {insights.fitScore}%</Text>
          <Text>Recommended Skills: {insights.recommendedSkills.join(', ')}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  applicationContainer: {
    marginBottom: 20,
  },
  jobTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  insightsContainer: {
    marginTop: 20,
  },
  insightsTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Base;
