module UsersPollsTestHelper
  def expected_users_poll
    yasir_snake = polls(:yasir_snake)
    yasir_it = polls(:yasir_it)

    @expected_users_poll ||= [
      {
        'poll_id' => yasir_snake.id,
        'question' => 'Fav snake',
        'categories' => yasir_snake.categories.pluck(:id, :name),
        'options' => {
          'Python' => {'percentage' => 50.0, 'selected' => true},
          'Cobra' => {'percentage' => 25.0, 'selected' => false},
          'Viper' => {'percentage' => 25.0, 'selected' => false},
          'Mamba' => {'percentage' => 0.0, 'selected' => false}
        }
      },
      {
        'poll_id' => yasir_it.id,
        'question' => 'Fav programming language',
        'categories' => yasir_it.categories.pluck(:id, :name),
        'options' => {
          'Python' => {'percentage' => 25.0, 'selected' => false},
          'Ruby' => {'percentage' => 75.0, 'selected' => true},
          'Java' =>  {'percentage' => 0.0, 'selected' => false},
          'JavaScript' =>  {'percentage' => 0.0, 'selected' => false}
        }
      }
    ]
  end
end
