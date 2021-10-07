from django.db import models

class BloodPressure(models.Model):
    # TODO add uuid
    systolic_pressure = models.IntegerField()
    diastolic_pressure = models.IntegerField()
    heart_rate = models.IntegerField()
    note = models.TextField(null=True, blank=True)
    last_modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return self.note