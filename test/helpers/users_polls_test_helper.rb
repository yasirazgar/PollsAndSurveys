module UsersPollsTestHelper
  private

  def expected_users_poll

    @expected_users_poll ||= [
      {
        'poll_id' => 1,
        'question' => 'Fav snake',
        'categories' => [[3, 'Animals']],
        'options' => {
          'Python' => {'percentage' => 50, 'selected' => true},
          'Cobra' => {'percentage' => 25.0, 'selected' => false},
          'Viper' => {'percentage' => 25.0, 'selected' => false},
          'Mamba' => {'percentage' => 0, 'selected' => false}
        }
      },
      {
        'poll_id' => 2,
        'question' => 'Fav programming language',
        'categories' => [[2, 'Programming languages']],
        'options' => {
          'Python' => {'percentage' => 25.0, 'selected' => false},
          'Ruby' => {'percentage' => 75.0, 'selected' => true},
          'Java' =>  {'percentage' => 0.0, 'selected' => false},
          'JavaScript' =>  {'percentage' => 0.0, 'selected' => false}
        }
      },
      {
        'poll_id' => 3,
        'question' => 'Some dumb question',
        'categories' => [],
        'options' => {
          'Crazy' => {'percentage' => 0, 'selected' => false},
          'Stupid' => {'percentage' => 0, 'selected' => false},
          'Annoying' => {'percentage' => 0, 'selected' => false}
        }
      }
    ]
  end
end
