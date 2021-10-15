
def average_systolic_pressure(systolic_pressure_list):
    """
    Calculate average systolic pressure
    """
    if not systolic_pressure_list:
        return 0
    return round(sum(systolic_pressure_list) / len(systolic_pressure_list))


def average_diastolic_pressure(diastolic_pressure_list):
    """
    Calculate average diastolic pressure
    """
    if not diastolic_pressure_list:
        return 0
    return round(sum(diastolic_pressure_list) / len(diastolic_pressure_list))