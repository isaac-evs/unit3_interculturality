import streamlit as st
import plotly.express as px
import pandas as pd

# App Configuration
st.set_page_config(
    page_title="Culture Compass",
    page_icon="🌍",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS
st.markdown("""
    <style>
    .main {
        background-color: #F5F5F5;
    }
    .header-text {
        font-size: 3em !important;
        color: #2F4F4F !important;
        text-align: center;
        padding: 20px;
    }
    .dimension-card {
        border-radius: 15px;
        padding: 25px;
        margin: 15px 0;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
    }
    .dimension-card:hover {
        transform: translateY(-5px);
    }
    .bubble-container {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    .bubble {
        background-color: #FFD166;
        color: #000;
        border-radius: 20px;
        padding: 10px 15px;
        font-size: 0.9em;
        box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
    }
    </style>
    """, unsafe_allow_html=True)

# Sample Data (Added Mexico)
countries_data = {
    'Country': ['USA', 'Japan', 'Germany', 'Brazil', 'Mexico'],
    'Power Distance': [40, 54, 35, 69, 81],
    'Individualism': [91, 46, 67, 38, 30],
    'Masculinity': [62, 95, 66, 49, 69],
    'Uncertainty Avoidance': [46, 92, 65, 76, 82],
    'Long-Term Orientation': [26, 88, 83, 44, 24],
    'Indulgence': [68, 42, 40, 59, 97]
}

# Global Dimensions dictionary (display names with emoji and color)
dimensions = {
    "Power Distance": ("📏", "#4B9CD3"),
    "Individualism vs Collectivism": ("👥", "#FF6B6B"),
    "Masculinity vs Femininity": ("⚖️", "#88D498"),
    "Uncertainty Avoidance": ("🎲", "#FFD166"),
    "Long-Term Orientation": ("⏳", "#A64AC9"),
    "Indulgence vs Restraint": ("🎭", "#F25F5C")
}

# Mapping from extended dimension names to data column names
dimension_mapping = {
    "Power Distance": "Power Distance",
    "Individualism vs Collectivism": "Individualism",
    "Masculinity vs Femininity": "Masculinity",
    "Uncertainty Avoidance": "Uncertainty Avoidance",
    "Long-Term Orientation": "Long-Term Orientation",
    "Indulgence vs Restraint": "Indulgence"
}

# Helper Functions
def create_radar_chart(country_data):
    # This function is set up for a single country's data (not used in the current UI)
    df = pd.DataFrame({
        'Dimension': list(country_data.keys())[1:],  # excluding 'Country'
        'Score': list(country_data.values())[1:]
    })
    fig = px.line_polar(df, r='Score', theta='Dimension', line_close=True)
    fig.update_traces(fill='toself')
    return fig

def get_dimension_description(dimension):
    descriptions = {
        "Power Distance": "This dimension expresses the degree to which the less powerful members of a society accept and expect that power is distributed unequally.",
        "Individualism vs Collectivism": "This dimension deals with the degree of interdependence a society maintains among its members. Individualistic cultures value independence and self-reliance, while collectivist cultures emphasize group cohesion.",
        "Masculinity vs Femininity": "This dimension contrasts a preference for achievement, assertiveness, and material success (masculinity) with a preference for cooperation, modesty, and quality of life (femininity).",
        "Uncertainty Avoidance": "The extent to which members of a culture feel threatened by ambiguous or unknown situations, leading to the establishment of strict rules and policies.",
        "Long-Term Orientation": "This reflects a society’s time horizon. Cultures with a long-term orientation plan for the future and value perseverance, whereas short-term oriented cultures emphasize traditions and the current social hierarchy.",
        "Indulgence vs Restraint": "This dimension measures the extent to which societies allow relatively free gratification of basic human drives versus suppressing them through strict social norms."
    }
    return descriptions.get(dimension, "Description not available.")

def get_real_life_example(dimension):
    examples = {
        "Power Distance": "In high power distance cultures, employees may hesitate to contradict their bosses directly, leading to top-down decision-making.",
        "Individualism vs Collectivism": "In individualistic societies, personal achievements are celebrated, whereas in collectivist cultures, group harmony is paramount.",
        "Masculinity vs Femininity": "In masculine cultures, competition and assertiveness are rewarded, while in feminine cultures, quality of life and cooperation are prioritized.",
        "Uncertainty Avoidance": "Cultures with high uncertainty avoidance may rely heavily on established procedures to manage the unpredictability of life.",
        "Long-Term Orientation": "Long-term oriented cultures invest in education and long-term planning, whereas short-term oriented cultures often focus on immediate results.",
        "Indulgence vs Restraint": "Indulgent societies encourage enjoying life and leisure, while restrained cultures tend to enforce strict codes of behavior."
    }
    return examples.get(dimension, "Example not available.")

def visualize_dimension(dimension):
    df = pd.DataFrame(countries_data)
    col_name = dimension_mapping.get(dimension, dimension)
    fig = px.bar(df, x='Country', y=col_name, title=f"{dimension} Across Cultures",
                 color='Country', template="plotly_white")
    st.plotly_chart(fig, use_container_width=True)

def compare_countries(selected_countries):
    df = pd.DataFrame(countries_data)
    # Filter dataframe for selected countries
    filtered_df = df[df['Country'].isin(selected_countries)]

    # Prepare data for a radar chart by melting the dataframe
    metrics = list(dimension_mapping.values())  # data columns
    df_long = pd.melt(filtered_df, id_vars=["Country"], value_vars=metrics,
                      var_name="Dimension", value_name="Score")
    # Map short names back to extended names for display purposes
    invert_mapping = {v: k for k, v in dimension_mapping.items()}
    df_long["Dimension"] = df_long["Dimension"].map(invert_mapping)

    fig = px.line_polar(
        df_long,
        r="Score",
        theta="Dimension",
        color="Country",
        line_close=True,
        title="Cultural Dimensions Radar Chart",
        template="plotly_dark"
    )
    st.plotly_chart(fig, use_container_width=True)

def display_scenarios():
    scenarios = {
        "Negotiating a Business Deal": [
            "Clearly outline expectations.",
            "Emphasize long-term benefits.",
            "Build trust through personal rapport.",
            "Clarify ambiguous points early.",
            "Provide detailed background information.",
            "Focus on mutual benefits.",
            "Encourage open discussion.",
            "Use visual aids to support points.",
            "Confirm decisions in writing.",
            "Ask clarifying questions."
        ],
        "Team Collaboration Meeting": [
            "Encourage equal participation.",
            "Rotate leadership roles.",
            "Set clear meeting objectives.",
            "Acknowledge every input.",
            "Summarize key points frequently.",
            "Use breakout sessions.",
            "Foster an inclusive environment.",
            "Rotate speaking opportunities.",
            "Provide positive feedback.",
            "Keep the tone collaborative."
        ],
        "Performance Review Discussion": [
            "Highlight individual achievements.",
            "Provide constructive criticism.",
            "Discuss future career goals.",
            "Offer actionable feedback.",
            "Recognize efforts and improvements.",
            "Encourage self-assessment.",
            "Set clear performance targets.",
            "Incorporate peer reviews.",
            "Emphasize professional growth.",
            "Celebrate successes."
        ]
    }

    scenario_choice = st.selectbox("Choose a Scenario", list(scenarios.keys()))
    st.markdown(f"### {scenario_choice}")
    st.write("Examples:")

    examples = scenarios[scenario_choice]
    # Display each example as a bubble using HTML/CSS styling
    bubble_html = '<div class="bubble-container">'
    for example in examples:
        bubble_html += f'<div class="bubble">{example}</div>'
    bubble_html += '</div>'
    st.markdown(bubble_html, unsafe_allow_html=True)

def main():
    st.markdown('<p class="header-text">Culture Compass 🌐</p>', unsafe_allow_html=True)

    # Sidebar Navigation
    with st.sidebar:
        st.header("Navigation")
        app_section = st.radio("Go to:", [
            "🌍 Cultural Dimensions Overview",
            "📊 Dimension Explorer",
            "⚖️ Cultural Comparison",
            "💡 Real-Life Scenarios"
        ])

    # Main Content Sections
    if app_section == "🌍 Cultural Dimensions Overview":
        st.subheader("Understanding Hofstede's Framework")
        cols = st.columns(2)
        for i, (dim, (emoji, color)) in enumerate(dimensions.items()):
            with cols[i % 2]:
                with st.expander(f"{emoji} {dim}", expanded=True):
                    st.markdown(f"""
                    <div class="dimension-card" style="background-color: {color}20; border-left: 5px solid {color}">
                        <h4 style="color: {color};">{dim}</h4>
                        <p>{get_dimension_description(dim)}</p>
                        <div style="margin-top: 15px;">
                            <strong>Real-life Example:</strong><br>
                            <p>{get_real_life_example(dim)}</p>
                        </div>
                    </div>
                    """, unsafe_allow_html=True)

    elif app_section == "📊 Dimension Explorer":
        st.subheader("Interactive Dimension Explorer")
        selected_dimension = st.selectbox("Choose a Dimension", list(dimensions.keys()))
        visualize_dimension(selected_dimension)

    elif app_section == "⚖️ Cultural Comparison":
        st.subheader("Cross-Cultural Comparison Tool")
        selected_countries = st.multiselect("Select Countries", countries_data['Country'], default=["USA", "Japan", "Mexico"])
        if selected_countries:
            compare_countries(selected_countries)
        else:
            st.info("Please select at least one country to compare.")

    elif app_section == "💡 Real-Life Scenarios":
        st.subheader("Cultural Dimension Scenarios")
        display_scenarios()

if __name__ == "__main__":
    main()
