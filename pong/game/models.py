from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class GameInvite(models.Model):
	sender = models.ForeignKey('auth.User', related_name='game_invites_sent', on_delete=models.CASCADE)
	receiver = models.ForeignKey('auth.User', related_name='game_invites_received', on_delete=models.CASCADE)
	join = models.BooleanField(default=False)
	ignore = models.BooleanField(default=False)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return f'{self.sender} invited {self.receiver}'
	
	def join_invite(self):
		self.join = True
		self.save()

	def ignore_invite(self):
		self.ignore = True
		self.save()

class PongGame(models.Model):
    players = models.ManyToManyField(User, related_name='pong_games')
    max_players = models.IntegerField(default=2)
    game_process = models.BooleanField(default=False)
    game_mode = models.CharField(max_length=25)

    def __str__(self):
        return f'{self.players.all()}'
    
    def is_full(self):
        return self.players.count() == self.max_players

class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    win = models.IntegerField(default=0)
    lose = models.IntegerField(default=0)
    points = models.IntegerField(default=0)
    game = models.ForeignKey(PongGame, related_name='game_players', on_delete=models.CASCADE, null=True, blank=True)
    fa = models.BooleanField(default=False)
    game_process = models.BooleanField(default=False)
    game_mode = models.CharField(max_length=25, blank=True, default='')

    def __str__(self):
        return f'{self.user}'

class History(models.Model):
	player = models.ForeignKey('Player', related_name='histories', on_delete=models.CASCADE)
	opponent = models.ForeignKey('Player', related_name='opponent_histories', on_delete=models.CASCADE)
	result = models.CharField(max_length=10)
	created_at = models.DateTimeField(auto_now_add=True)
	points = models.IntegerField(default=0)
	game_mode = models.CharField(max_length=25)

	def __str__(self):
		return f'{self.player} vs {self.opponent}'