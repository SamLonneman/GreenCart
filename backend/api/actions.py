from django.db.models import Avg, F
from django.db.models.functions import Cast
from django.db.models.fields import DurationField


# Calculate progress tracking statistics for a user
def calculate_stats(user):
    
    # Get the user's completed tasks
    tasks = user.task_set.all()
    completedTasks = tasks.filter(is_completed=True)

    # Calculate the statistics
    num_tasks_accepted = tasks.filter(is_accepted=True).count()
    num_tasks_completed = completedTasks.count()
    average_turnaround_time = completedTasks.aggregate(
        avg_turnaround=Avg(
            Cast(F('completed_date') - F('accepted_date'), DurationField())
        )
    )['avg_turnaround']
    average_turnaround_time = average_turnaround_time.total_seconds() / 86400 if average_turnaround_time else None
    num_community_oriented = completedTasks.filter(is_community_oriented=True).count()
    num_learning = completedTasks.filter(is_learning_task=True).count()
    num_impactful = completedTasks.filter(is_impactful=True).count()
    num_challenging = completedTasks.filter(is_challenging=True).count()

    # Return the statistics
    return {
        "num_tasks_accepted": num_tasks_accepted,
        "num_tasks_completed": num_tasks_completed,
        "average_turnaround_time": average_turnaround_time,
        "num_community_oriented": num_community_oriented,
        "num_learning": num_learning,
        "num_impactful": num_impactful,
        "num_challenging": num_challenging
    }
