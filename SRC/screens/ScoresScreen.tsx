import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface ScoringCriteria {
  id: string;
  label: string;
  score: number;
}

const ScoresScreen: React.FC = () => {
  const navigation = useNavigation();
  const [scores, setScores] = useState<ScoringCriteria[]>([
    { id: '1', label: 'Image Quality', score: 0 },
    { id: '2', label: 'Anatomical Identification', score: 0 },
    { id: '3', label: 'Probe Technique', score: 0 },
    { id: '4', label: 'Interpretation Accuracy', score: 0 },
    { id: '5', label: 'Patient Communication', score: 0 },
  ]);

  const handleScoreChange = (id: string, value: number) => {
    setScores(prevScores => 
      prevScores.map(score => 
        score.id === id ? { ...score, score: value } : score
      )
    );
  };

  const calculateTotalScore = () => {
    return scores.reduce((total, score) => total + score.score, 0);
  };

  const handleSubmit = () => {
    const totalScore = calculateTotalScore();
    Alert.alert(
      'Score Summary', 
      `Total Score: ${totalScore}/25\nPercentage: ${(totalScore/25*100).toFixed(1)}%`
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.menuIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Performance Scoring</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.instructions}>
          Rate each criterion from 1 (Poor) to 5 (Excellent)
        </Text>

        {scores.map((criterion) => (
          <View key={criterion.id} style={styles.criterionContainer}>
            <Text style={styles.criterionLabel}>{criterion.label}</Text>
            <View style={styles.radioGroup}>
              {[1, 2, 3, 4, 5].map((value) => (
                <TouchableOpacity
                  key={value}
                  style={[
                    styles.radioButton,
                    criterion.score === value && styles.radioButtonSelected,
                  ]}
                  onPress={() => handleScoreChange(criterion.id, value)}
                >
                  <Text 
                    style={[
                      styles.radioButtonText,
                      criterion.score === value && styles.radioButtonTextSelected,
                    ]}
                  >
                    {value}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.submitContainer}>
          <Text style={styles.totalScore}>
            Total Score: {calculateTotalScore()}/25
          </Text>
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Submit Evaluation</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 16,
    paddingTop: 50,
  },
  menuButton: {
    padding: 5,
  },
  menuIcon: {
    color: 'white',
    fontSize: 24,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  instructions: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  criterionContainer: {
    marginBottom: 25,
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
  },
  criterionLabel: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000',
    fontWeight: '500',
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButton: {
    width: 45,
    height: 45,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  radioButtonSelected: {
    backgroundColor: 'red',
  },
  radioButtonText: {
    color: 'red',
    fontSize: 18,
    fontWeight: '500',
  },
  radioButtonTextSelected: {
    color: 'white',
  },
  submitContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalScore: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  submitButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 30,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default ScoresScreen;